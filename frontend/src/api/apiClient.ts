import axios from "axios";
import type { ApiResult } from "./types";
import { cookies } from "../utilities/cookies";
import { refreshLogin } from "./auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // "X-CSRF-TOKEN": cookies.get("csrf_token"),
  },
  withCredentials: true, // allow cookies / auth headers to be sent
});

apiClient.interceptors.request.use((config) => {
  const csrfToken = cookies.get("csrf_token");
  // console.log("From API client:", config);

  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }

  return config;
});

// intercept every response
apiClient.interceptors.response.use(
  //
  (response) => {
    console.log(response.data);
    return response.data;
  },

  // Error handler
  async (error) => {
    if (
      error.response?.status === 401 &&
      !(error.config.url === "/auth/refresh")
    ) {
      return retry(error);
    }

    return normalizeError(error);
  },
);

// retry error 401
const retry = async (error: any) => {
  const originalRequest = error.config;
  console.log(originalRequest._retry);

  if (originalRequest._retry) {
    return normalizeError(error);
  }

  originalRequest._retry = true;

  const response = await refreshLogin();

  console.log("retry function:\nResponse.success:", response.success);

  if (!response.success) {
    return normalizeError(error);
    // logout user
  }

  // retry queued requests

  return apiClient(originalRequest);
};

const normalizeError = (error: any) => {
  // Normalize error into ApiReslt type
  const normalizedError: ApiResult<null> = {
    success: false,
    message: error.response?.data?.error?.message || "Request failed",
    data: null,
    error: {
      errorCode: error.response?.data?.error?.code || "UNKNOWN_ERROR",
      statusCode: error.response?.status,
      details: error.response?.data?.error?.details,
      message:
        error.response?.data?.error?.message ||
        error.message ||
        "Something went wrong",
    },
  };
  return normalizedError;
};

export default apiClient;
