import React, { useState, useContext } from "react";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorModal from "../../components/Modal";
import AdminHome from "./Components/AdminHome";
import LoadingSpinner from "../../components/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { AdminContext } from "../../context/admin-context";
import "./Admin.css";

const Admin = () => {
  const auth = useContext(AdminContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/auth`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (responseData.verified) {
        auth.login();
        console.log('Logged In');
        console.log(auth.isLoggedIn);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {auth.isLoggedIn && <AdminHome />}
      {!auth.isLoggedIn && (
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Admin Access</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="Please enter a valid password, at least 8 characters."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Login
            </Button>
          </form>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Admin;
