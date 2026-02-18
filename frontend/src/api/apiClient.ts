import axios from "axios";
import type { ApiResult } from "./types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allow cookies / auth headers to be sent
});

// INTERCEPTOR intercepts every response before it reaches the calling code
apiClient.interceptors.response.use(
  //
  (response) => {
    console.log(response);
    return response.data;
  },

  // Error handler
  (error) => {
    // Normalize error into ApiReslt type
    const normalizedError: ApiResult<null> = {
      success: false,
      message: error.response?.data?.message || "Request failed",
      data: null,
      error: {
        code: error.response?.data?.error?.code || "UNKNOWN_ERROR",
        details: error.response?.data?.error?.details,
        message:
          error.response?.data?.error?.message ||
          error.message ||
          "Something went wrong",
      },
    };
    Promise.reject(normalizedError);
  },
);
export default apiClient;
