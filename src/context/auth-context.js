import { createContext } from "react";

let authModel = {
  userid: "",
  isLoggedIn: false,
  isInstructor: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(authModel);
