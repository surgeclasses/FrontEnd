import { createContext } from "react";

const authModel = {
  userid: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(authModel);
