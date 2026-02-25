import { useState } from "react";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(email, firstName, lastName, password);

    // clear form after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsPasswordMatch(true);
    setIsLoading(false);
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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Last Name"
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <input
            type="password"
            required
            placeholder="Confirm Password"
            className={`input ${isPasswordMatch ? "input-bordered" : "input-error"} w-full`}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setIsPasswordMatch(e.target.value === password);
            }}
          />
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
