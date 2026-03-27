import Navbar from "../components/Navbar";
import Login from "./Login";
import Register from "./Register";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
      </div>
      <Login />
      <Register />
    </>
  );
};

export default Layout;
