export const onLogin = async (email: string, password: string) => {
  try {
    const response = await fetch("https://localhost:5050/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
