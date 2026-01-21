export const onLogin = async (email: string, password: string) => {
  try {
    const response = await fetch("https://localhost:5050/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // include cookies
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    console.log(document.cookie);
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
