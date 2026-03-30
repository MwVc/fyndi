import { useContext, type JSX } from "react";
import { UserContext } from "../../context/UserProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedin } = useContext(UserContext);

  if (!isLoggedin) {
    // user is not logged in redirect to login
    return <Navigate to="/login" replace></Navigate>; // "replace": avoids keeping the protected page in history
  }

  return children;
};
