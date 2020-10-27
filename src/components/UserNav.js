import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

import "./UserNav.css";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Instructor from "../pages/Instructor/Instructor";

const UserNav = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [instructorProfile, setInstructorProfile] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/user/" +
            firebase.auth().currentUser.email
        );
        if (responseData.isInstructor) {
          setIsInstructor(true);
        }
        const profile = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/instructor/" +
            responseData.instructorProfile
        );
        setInstructorProfile(profile);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInfo();
  }, []);

  const signOutHandler = () => {
    auth.logout();
    firebase.auth().signOut();
  };

  const beInstructorHandler = () => {
    history.push("/Instructor");
  };

  const goToMyCourses = () => {
    history.push("/MyCourses");
  };

  return (
    <div className="user-nav">
      <img className="user-dp" src={firebase.auth().currentUser.photoURL} />
      <div class="speech-bubble">
        <ul>
          {/*<li onClick={goToMyCourses}>My Courses</li>
          <li onClick={beInstructorHandler}>
            {isInstructor ? "Instructor Profile" : "Become Instructor"}
          </li>
  <li>Update Profile</li>*/}
          <li onClick={signOutHandler}>Sign Out</li>
        </ul>
      </div>
    </div>
  );
};

export default UserNav;
