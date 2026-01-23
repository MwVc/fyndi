import { useEffect } from "react";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

const App = () => {
  useEffect(
    () => document.documentElement.setAttribute("data-theme", "light"),
    [],
  );

  return (
    <>
      <Layout />
      <Login />
    </>
  );
};

export default App;
