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
  console.log("From API client:", config);

  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

// INTERCEPTOR intercepts every response before it reaches the calling code
apiClient.interceptors.response.use(
  //
  (response) => {
    console.log(response);
    return response.data;
  },

  // Error handler
  async (error) => {
    const originalRequest = error.config;

    // prevent refresh loop
    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest.retry) {
      if (isRefreshing) {
        // queue request while refresh runs
      }
    }
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
  },
);
export default apiClient;
