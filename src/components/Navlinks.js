import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";

import "./Navlinks.css";

const Navlinks = (props) => {
  
  let location = useLocation();
  console.log(location.pathname);

  return (
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
        {/* <Link
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Contact
        </Link> */}
        <NavLink to="/Contact">Contact</NavLink>
      </li>
      {/* <li>
      <Link
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          About
        </Link> 
      </li> */}
      <li>
        <NavLink to="/auth">Sign In</NavLink>
      </li>
    </ul>
  );
};

export default Navlinks;
