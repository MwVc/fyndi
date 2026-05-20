import type { ApiResult } from "../types";

export const normalizeError = (error: any) => {
  // Normalize error into ApiReslt type
  const normalizedError: ApiResult<null> = {
    success: false,
    message: error.response?.data?.error?.message || "Request failed",
    data: null,
    error: {
      errorCode: error.response?.data?.error?.code || "UNKNOWN_ERROR",
      statusCode: error.response?.status || null,
      details: error.response?.data?.error?.details || null,
      message:
        error.response?.data?.error?.message ||
        error.message ||
        "Something went wrong",
    },
  };
  return normalizedError;
};
