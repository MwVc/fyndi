import apiClient from "./apiClient";
import type { ApiResult } from "./types";

export const onLogin = async (
  email: string,
  password: string,
): Promise<ApiResult<null>> => {
  const result: ApiResult<null> = await apiClient.post("/auth/login", {
    email: email,
    password: password,
  });

  if (!result.success) {
    console.log(result);
  }

  return result;
};

export const onLogout = async (): Promise<ApiResult<null>> => {
  const result: ApiResult<null> = await apiClient.post("auth/logout");

  return result;
};
