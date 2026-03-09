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

// INTERCEPTOR intercepts every response before it reaches the calling code
apiClient.interceptors.response.use(
  //
  (response) => {
    console.log(response);
    return response.data;
  },

  // Error handler
  async (error) => {
    console.log("From API client frontend", error);
    if (error.response?.status === 401 && !error.config.retry) {
      console.log("this is from apiClient and am calling refresh endpoint");
      console.log(error.config.retry);

      const newConfig = error.config;
      newConfig.retry = true;
      await refreshLogin();

      return apiClient(newConfig);
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
