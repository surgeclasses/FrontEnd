import { createContext } from "react";

const authModel = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const AdminContext = createContext(authModel);
