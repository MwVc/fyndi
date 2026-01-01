import { useEffect } from "react";
import Layout from "./pages/Layout";

const App = () => {
  useEffect(
    () => document.documentElement.setAttribute("data-theme", "light"),
    []
  );

  return <Layout />;
};

export default App;
