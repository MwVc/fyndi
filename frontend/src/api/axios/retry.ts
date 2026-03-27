import { normalizeError } from "./normalize_error_response";
import { logoutUser, refreshLogin } from "../auth";
import apiClient from "./apiClient";
import { authContext } from "../../context/auth.events";

let isRefreshing: boolean = false;
let retryQueue: any[] = [];

export const retryRequest = async (error: any) => {
  const originalRequest = error.config;
  console.log("Retry request is fired");

  if (isRefreshing) {
    console.log(retryQueue);

    return new Promise((resolve, reject) => {
      retryQueue.push({ originalRequest, resolve, reject });
    });
  }

  isRefreshing = true;

  const refreshToken = async () => {
    if (originalRequest._retry) {
      return normalizeError(error);
    }

    originalRequest._retry = true;

    const response = await refreshLogin();

    return response;
  };

  const response = await refreshToken();

  console.log("retry function. Response.success:", response.success);

  if (!response.success) {
    retryQueue.forEach(({ reject }) => reject(normalizeError(originalRequest)));
    retryQueue = [];
    isRefreshing = false;

    authContext.notify(false); // logout the user: notify authContext to set state to loggedIn false
    logoutUser();

    return normalizeError(error);
  }

  if (retryQueue.length > 0) {
    retryQueue.forEach(({ resolve, originalRequest }) =>
      resolve(apiClient(originalRequest)),
    );

    retryQueue = [];
  }

  isRefreshing = false;

  return apiClient(originalRequest);
};
