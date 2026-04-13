import { useContext, useState } from "react";
import { hitServer, logoutUser } from "../api/auth";
import { UserContext } from "../context/UserProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedin, setIsLoggedin } = useContext(UserContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

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

  const handleCategoryButtonClick = (categoryId: number) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
  };
  const categories = [
    { category: "Plumbing", id: 1 },
    { category: "Electrical", id: 2 },
    { category: "Carpentry", id: 3 },
    { category: "Masonry", id: 4 },
    { category: "Painting", id: 5 },
    { category: "Welding", id: 6 },
    { category: "Mechanic", id: 7 },
    { category: "Cleaning", id: 8 },
    { category: "Moving Services", id: 9 },
    { category: "Electronics", id: 10 },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-sm top-0 sticky z-50 flex flex-col">
      {/* Container to center content */}
      <div className="w-11/12 md:w-7/12 mx-auto flex justify-between items-center">
        {/* Left side: brand */}
        <a className=" text-xl normal-case">
          <h1>fyndi</h1>
        </a>

        {/* Right side: search + avatar dropdown */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered hidden sm:block sm:w-48"
          />

          {isLoggedin ? (
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
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-row justify-center gap-1">
              <Link to="/login" className="link link-hover">
                Log In
              </Link>
              |
              <Link to="/register" className="link link-hover">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* buttons to filter jobs */}
      <div className="w-11/12 md:w-7/12 overflow-auto flex flex-row justify-between gap-2 p-4 sticky">
        {categories.map((category) => (
          <button
            className={`btn btn-sm btn-outline ${category.id === selectedCategoryId && "btn-active"}`}
            onClick={() => handleCategoryButtonClick(category.id)}
            key={category.category}
          >
            {category.category}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
