import { useEffect } from "react";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./components/Main";
import { me, refreshLogin } from "./api/auth";
import Job from "./pages/Job";
import FundiProfile from "./pages/FundiProfile";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {
  const { setIsLoggedin } = useContext(UserContext);

  const checkLogin = async () => {
    const meResponse = await me();

    if (meResponse.success) {
      setIsLoggedin(true);
      return;
    }

    const refreshResponse = await refreshLogin();

    if (!refreshResponse.success) {
      return;
    }

    setIsLoggedin(true);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");

    // login user on app start
    checkLogin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />}></Route>
        <Route path="job/:id" element={<Job />}></Route>
        <Route path="/profile" element={<FundiProfile />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default App;
