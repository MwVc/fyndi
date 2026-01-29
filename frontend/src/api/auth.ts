import apiClient from "./apiClient";

export const onLogin = async (email: string, password: string) => {
  try {
    const axiosResponse = await apiClient.post("/auth/login", {
      email: email,
      password: password,
    });

    console.log(axiosResponse);
  } catch (error) {
    console.log(error);
  }
};

export const onLogout = async () => {
  try {
    const response = await fetch("https://localhost:5050/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    return response;

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
