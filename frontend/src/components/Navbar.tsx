import { useContext } from "react";
import { hitServer, logoutUser } from "../api/auth";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { isLoggedin, setIsLoggedin } = useContext(UserContext);

  const logout = async () => {
    const response = await logoutUser();

    if (response.success) {
      setIsLoggedin(false);
    }
  };

  const profile = async () => {
    const response = await hitServer();
    console.log("Log from Navbar component:", response);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Container to center content */}
      <div className="w-11/12 md:w-7/12 mx-auto flex justify-between items-center">
        {/* Left side: brand */}
        <a className=" text-xl normal-case">
          <h1>fyndi</h1>
        </a>

        {/* Right side: search + avatar dropdown */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered hidden sm:block sm:w-48"
          />

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              {isLoggedin ? (
                <>
                  <li>
                    <a className="justify-between" onClick={() => profile()}>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>{" "}
                </>
              ) : (
                <li className="flex flex-row justify-center">
                  <a
                    onClick={() => {
                      (
                        document.getElementById(
                          "login_modal",
                        ) as HTMLDialogElement
                      )?.showModal();
                    }}
                  >
                    Log In
                  </a>
                  |
                  <a
                    onClick={() => {
                      console.log("register button clicked");
                      (
                        document.getElementById(
                          "register_modal",
                        ) as HTMLDialogElement
                      )?.showModal();
                    }}
                  >
                    Register
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
