import { useEffect } from "react";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import { onLogin } from "./api/auth";

const App = () => {
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
