import { useEffect } from "react";
import Layout from "./pages/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { refreshLogin } from "./api/auth";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {
  const { setIsLoggedin } = useContext(UserContext);

  const checkLogin = async () => {
    const response = await refreshLogin();

    if (!response.success) {
      return;
    }

    setIsLoggedin(true);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");

    // refresh login on app start
    checkLogin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default App;
