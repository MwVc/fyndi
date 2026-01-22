import {
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import { createContext } from "react";

interface UserContextType {
  loggedin: boolean;
  setIsLoggedin: Dispatch<SetStateAction<boolean>>;
  role: "user" | "admin";
}

const UserContext = createContext<UserContextType>({
  loggedin: false,
  setIsLoggedin: () => {},
  role: "user",
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [loggedin, setIsLoggedin] = useState(false);
  const role = "user";

  return (
    <UserContext.Provider value={{ loggedin, setIsLoggedin, role }}>
      {children}
    </UserContext.Provider>
  );
};
