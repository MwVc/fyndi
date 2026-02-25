import { useState } from "react";
import { registerUser } from "../api/auth";

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
    <dialog className="modal" id="register_modal">
      <div className="modal-box flex flex-col px-15 py-10 gap-4 justify-center items-center">
        <h3 className="font-bold text-lg">Register</h3>
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
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Register;
