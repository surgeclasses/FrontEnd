import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";

import "./UserHome.css";
import { useHttpClient } from "../../hooks/http-hook";
import MyCourses from "./Components/MyCourses";
import HotTechnologies from "../HomePage/Components/HotTechnologies";
import { AuthContext } from "../../context/auth-context";

const UserHome = () => {
  const auth = useContext(AuthContext);
  const [hasResult, setHasResult] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const createUpdateUser = async () => {
      if (auth.isLoggedIn) {
        //check if the user already exists
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL +
              "/user/" +
              firebase.auth().currentUser.email
          );
          console.log(responseData);
          auth.userid = responseData._id;
          if (!isLoading) {
            setHasResult(!!responseData);
          }
        } catch (err) {
          console.log(err);
        }
        //if user not exist, create user
        if (!hasResult) {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + "/user",
              "POST",
              JSON.stringify({
                name: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                mobile: firebase.auth().currentUser.phoneNumber
                  ? firebase.auth().currentUser.phoneNumber
                  : "NA",
              }),
              {
                "Content-Type": "application/json",
              }
            );
          } catch (err) {
            console.log(err);
          }
        }
      }
    };
    createUpdateUser();
  }, [auth.isLoggedIn]);

  return (
    <div className="body">
      <MyCourses />
      <HotTechnologies />
    </div>
  );
};

export default UserHome;
