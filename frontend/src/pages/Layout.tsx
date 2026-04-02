import Navbar from "../components/Navbar";
import Main from "../components/Main";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Main />
      </div>
    </>
  );
};

export default Layout;
