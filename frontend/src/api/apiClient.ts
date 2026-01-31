import axios from "axios";

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
  (response) => {
    console.log(response);
    return response;
  },
  (error) => Promise.reject(error),
);
export default apiClient;
