import {
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import { createContext } from "react";

interface UserContextType {
  isLoggedin: boolean;
  setIsLoggedin: Dispatch<SetStateAction<boolean>>;
  role: "user" | "admin";
}

export const UserContext = createContext<UserContextType>({
  isLoggedin: false,
  setIsLoggedin: () => {},
  role: "user",
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const role = "user";

  return (
    <UserContext.Provider value={{ isLoggedin, setIsLoggedin, role }}>
      {children}
    </UserContext.Provider>
  );
};
