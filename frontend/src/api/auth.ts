import apiClient from "./apiClient";
import type { ApiResult } from "./types";

interface userData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}: userData) => {
  const response: ApiResult<null> = await apiClient.post("/auth/register", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  console.log(response);
  return response;
};

export const onLogin = async (
  email: string,
  password: string,
): Promise<ApiResult<null>> => {
  const response: ApiResult<null> = await apiClient.post("/auth/login", {
    email: email,
    password: password,
  });

  if (!response.success) {
    console.log(response);
  }

  return response;
};

export const refreshLogin = async (): Promise<ApiResult<null>> => {
  const response: ApiResult<null> = await apiClient.post("/auth/refresh");

  return response;
};

export const onLogout = async (): Promise<ApiResult<null>> => {
  const result: ApiResult<null> = await apiClient.post("auth/logout");

  return result;
};

export const hitServer = async () => {
  return await apiClient.get("/");
};
