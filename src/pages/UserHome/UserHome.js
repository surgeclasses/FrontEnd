import React, { useContext } from "react";
import firebase from "firebase";

import "./UserHome.css";
import MyCourses from "./Components/MyCourses";
import HotTechnologies from "../HomePage/Components/HotTechnologies";
import { AuthContext } from "../../context/auth-context";

const UserHome = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="body">
      <div className="dp-title-container">
        <img
          className="user-dp"
          alt="profile picture"
          src={firebase.auth().currentUser.photoURL}
        />
        <h3 className="welcome-title">
          {firebase.auth().currentUser.displayName.split(' ')[0]}
        </h3>
      </div>
      <MyCourses />
      <HotTechnologies />
    </div>
  );
};

export default UserHome;
