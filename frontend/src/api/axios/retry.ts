import { normalizeError } from "./normalize_error_response";
import { refreshLogin } from "../auth";
import apiClient from "./apiClient";

let isRefreshing: boolean = true;
let retryQueue: any[] = [];

export const retryRequest = async (error: any) => {
  if (isRefreshing) {
    retryQueue.push(error.config);
    return;
  }

  const originalRequest = error.config;

  const refreshToken = async () => {
    isRefreshing = true;
    console.log(originalRequest._retry);

    if (originalRequest._retry) {
      return normalizeError(error);
    }

    originalRequest._retry = true;

    const response = await refreshLogin();

    return response;
  };

  const response = await refreshToken();

  console.log("retry function\nResponse.success:", response.success);

  if (!response.success) {
    return normalizeError(error);
    // logout user
  }

  apiClient(originalRequest);

  if (retryQueue.length > 0) {
    retryQueue.forEach((config) => apiClient(config));
  }
  isRefreshing = false;
  return;
};
