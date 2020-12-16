import { createContext } from "react";

let authModel = {
  userid: "",
  userName:"",
  email:'',
  isLoggedIn: false,
  isInstructor: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(authModel);
