import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

import "./UserNav.css";
import { AuthContext } from "../context/auth-context";
import cartIcon from "../assets/cart.png";

const UserNav = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const auth = useContext(AuthContext);

  const signOutHandler = () => {
    auth.logout();
    firebase.auth().signOut();
  };

  return (
    <div className="user-nav">
      <img className="user-dp" src={firebase.auth().currentUser.photoURL} />          
            <div class="speech-bubble">
              <ul>
                <li>My Courses</li>
                <li>Become Instructor</li>
                <li>Update Profile</li>
                <li onClick={signOutHandler}>Sign Out</li>
              </ul>
            </div>
    </div>
  );
};

export default UserNav;
