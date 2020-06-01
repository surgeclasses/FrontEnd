import React, { useState, useContext } from "react";

import { useForm } from "../../hooks/form-hook";
import "./Auth.css";
import Card from "../../components/Card";
import FirebaseAuth from "./FirebaseAuth";
import UserHome from "../UserHome/UserHome";
import {AuthContext} from "../../context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="body auth-page">
      {!auth.isLoggedIn && (
        <Card className="authentication">
          <h2>Please Signin</h2>
          <hr />
          <FirebaseAuth className="firebase-auth-card" />
        </Card>
      )}
      {
        auth.isLoggedIn && <UserHome/>
      }
    </div>
  );
};

export default Auth;
