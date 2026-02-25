import { useEffect } from "react";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  useEffect(
    () => document.documentElement.setAttribute("data-theme", "light"),
    [],
  );

  return (
    <>
      <Layout />
      <Login />
      <Register />
    </>
  );
};

export default App;
