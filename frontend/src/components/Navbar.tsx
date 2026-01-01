const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm border border-red-500">
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
            className="input input-bordered w-24 md:w-48"
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
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
