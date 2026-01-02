import { useEffect } from "react";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

const App = () => {
  const onLogin = async (email: string, password: string) => {
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

  useEffect(
    () => document.documentElement.setAttribute("data-theme", "light"),
    []
  );

  return (
    <>
      <Layout />
      <Login onLogin={onLogin} />
    </>
  );
};

export default App;
