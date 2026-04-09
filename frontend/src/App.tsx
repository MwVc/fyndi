import { useEffect } from "react";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./components/Main";
import { refreshLogin } from "./api/auth";
import Job from "./pages/Job";
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
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />}></Route>
        <Route path="job/:id" element={<Job />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default App;
