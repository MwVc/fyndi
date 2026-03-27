import { useEffect } from "react";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
};

export default App;
