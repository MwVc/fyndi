import axios, { AxiosError } from "axios";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  status?: number;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

apiClient.interceptors.response.use(
  (response: ApiResponse) => {
    return { success: true, data: response.data };
  },
  (error: AxiosError) => {
    return Promise.reject({
      success: false,
      message: error.message || "Internal Server Error",
      status: error.response?.status || 500,
    });
  },
);
