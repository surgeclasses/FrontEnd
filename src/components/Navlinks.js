import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import firebase from "firebase";

import { AuthContext } from "../context/auth-context";
import { AdminContext } from "../context/admin-context";
import "./Navlinks.css";
import cartIcon from "../assets/cart.png";

// <li> 
//           <NavLink to="/CourseDetails/5ef347fb30245c415414dd1e">Courses</NavLink>
//         </li>

const Navlinks = (props) => {
  const auth = useContext(AuthContext);
  const admin = useContext(AdminContext);

  // const signOutHandler = () => {
  //   auth.logout();
  //   firebase.auth().signOut();
  // };

  const adminSignOutHandler = () => {
    admin.logout();
  };

  let navLinks;

  if (auth.isLoggedIn) {
    navLinks = (
      <ul className="nav-links signed-nav">
        <li>
          <NavLink to="/Courses">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/Blogs">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/Contact">Contact</NavLink>
        </li>
      </ul>
    );
  } else if (admin.isLoggedIn) {
    navLinks = (
      <ul className="nav-links signed-nav">
        <li>
          <NavLink to="/EditCourse">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/AddBlog">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="/AddTechnology">Tech</NavLink>
        </li>
        <li>
          <NavLink to="/Enquiries">Enquiry</NavLink>
        </li>
        <li>
          <button className="profile-button" onClick={adminSignOutHandler}>
            SignOut
          </button>
        </li>
      </ul>
    );
  } else {
    navLinks = (
      <ul className="nav-links">
        {/* <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li> */}
        {/* <li> 5ef07f2dbe4c7b29184c3809
          <NavLink to="/Courses">Courses</NavLink>
        </li> */}
        
        {/* <li>
          <NavLink to="/Blogs">Blogs</NavLink>
        </li> */}
        {/* <li>
          <NavLink to="/Contact">Contact</NavLink>
        </li> */}
        <li>
          <NavLink to="/Auth">Sign In</NavLink>
        </li>
      </ul>
    );
  }

  return navLinks;
};

export default Navlinks;
