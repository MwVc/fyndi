import { useContext, useState } from "react";
import { googleLogin, loginUser } from "../api/auth";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { setIsLoggedin } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await loginUser(email, password);

    setIsLoading(false);

    if (!response.success) {
      setError(response.message);

      return;
    }

    navigate("/", { replace: true }); // (replace)prevents the user from pressing back and returning to login

    setIsLoggedin(true);
    setError(null);

    // clear form data
    setEmail("");
    setPassword("");
  };

  const loginWithGoogle = async () => {
    const response = await googleLogin();
    console.log(response);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title justify-center">Login</h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full p-5 gap-4 "
            method="post"
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-error text-sm">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="border-t border-base-300 flex flex-col gap-4 p-5 w-full">
            {/* login with google */}
            <button
              className="btn bg-white text-black border-[#e5e5e5]"
              onClick={loginWithGoogle}
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            {/* login with facebook */}
            <button className="btn bg-[#1A77F2] text-white border-[#005fd8]">
              <svg
                aria-label="Facebook logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill="white"
                  d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                ></path>
              </svg>
              Login with Facebook
            </button>
          </div>
          <div className="border-t border-base-300 flex flex-col gap-4 p-5 w-full items-center">
            <p className="text-base-content">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
