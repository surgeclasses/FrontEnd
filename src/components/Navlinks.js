import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import firebase from "firebase";

import { AuthContext } from "../context/auth-context";
import "./Navlinks.css";
import cartIcon from "../assets/cart.png";

const Navlinks = (props) => {
  const auth = useContext(AuthContext);

  const signOutHandler = () => {
    auth.logout();
    firebase.auth().signOut();
  };

  let navLinks;

  if (auth.isLoggedIn) {
    navLinks = (
      <ul className="nav-links">
        {/* <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/Courses">My Courses</NavLink>
        </li>
        <li>
          <NavLink to="/Blogs">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/Contact">Contact</NavLink>
        </li>
        <li>
          <button onClick={signOutHandler}>Sign Out</button>
        </li>
      </ul>
    );
  } else {
    navLinks = (
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/Courses">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/Blogs">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/Contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/Auth">Sign In</NavLink>
        </li>
      </ul>
    );
  }

  return navLinks;
};

export default Navlinks;
