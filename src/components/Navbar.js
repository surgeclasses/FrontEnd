import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";

import "./Navlinks";
import "./Navbar.css";
import Navlinks from "./Navlinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import Logo from "../assets/logo.png";
import Button from "./Button";

const Navbar = (props) => {
  const history = new useHistory();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const location = useLocation();
  // console.log(location.pathname);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const goToHome = () =>{
    history.push('/');
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <Navlinks />
        </nav>
      </SideDrawer>

      <header className={`main-header ${(location.pathname!=='/') && 'home-header'}`}>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <div className="main-navigation__brand" onClick={goToHome}>
          {/*<img src={Logo} className="logo" /> */}
          <h1 className="main-navigation__title">
            Surge Classes
            {/* <sub className="classes-subscript">
              <sub>classes</sub>
            </sub>            */}
          </h1>
          <div class="dropdown">
          <button class="dropbtn">Courses</button>
          <div class="dropdown-content">
            <a href="/CourseDetails/5ef07fc2be4c7b29184c380c">MERN</a>
            <a href="/CourseDetails/5ef347fb30245c415414dd1e">Data Science</a>
            <a href="/CourseDetails/5eff00e64f2225332c39f8f5">Android</a>
          </div>
        </div>
        </div>
        <nav className="main-navigation__header-nav">
          <Navlinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
