import axios from "axios";
import { retryRequest } from "./retry";
import { normalizeError } from "./normalize_error_response";
import { cookies } from "../../utilities/cookies";

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
      return retryRequest(error);
    }

    return normalizeError(error);
  },
);

// retry error 401

export default apiClient;
