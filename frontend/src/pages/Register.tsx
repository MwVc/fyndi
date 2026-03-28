import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    const response = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });

    setIsLoading(false);

    if (!response.success) {
      setError(response.message);
      return;
    }

    // clear form after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsPasswordMatch(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title justify-center">Register</h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full p-5 gap-4"
            method="post"
          >
            <input
              type="text"
              required
              placeholder="First Name"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              className={`input ${isPasswordMatch ? "input-bordered" : "input-error"} w-full`}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setIsPasswordMatch(event.target.value === password);
              }}
            />
            {error && <p className="text-error text-sm">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading || !isPasswordMatch}
            >
              Register
            </button>
          </form>
          <div className="divider">OR</div>
          <div className="flex flex-col gap-4 p-5 w-full">
            {/* login with google */}
            <button className="btn bg-white text-black border-[#e5e5e5]">
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
              Register with Google
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
              Register with Facebook
            </button>
            <div className="border-t border-base-300 flex flex-col gap-4 p-5 w-full items-center">
              <p className="text-base-content">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
