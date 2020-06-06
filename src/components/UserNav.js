import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase';

import "./UserNav.css";
import cartIcon from "../assets/cart.png";

const UserNav = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  //   const openDrawer = () => {
  //     setDrawerIsOpen(true);
  //   };

  //   const closeDrawer = () => {
  //     setDrawerIsOpen(false);
  //   };

  return (
    <React.Fragment>
      <header className="user-header">
        <nav className="user-nav-links">
          {/* <img
            src={firebase.auth().currentUser.photoURL}
          /> */}
          {/* <Link to="/Cart">
            <img className="cart-icon" src={cartIcon} />
          </Link> */}
          <img
            className="user-dp"
            src={firebase.auth().currentUser.photoURL}
          />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default UserNav;
