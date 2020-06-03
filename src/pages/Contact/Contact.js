import React from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import "./Contact.css";

const Contact = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      query: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contact`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          query: formState.inputs.query.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      <h2 className="center">Contact Form</h2>
      <Modal error={error} onClear={clearError} />
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="name"
            element="input"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          <Input
            id="email"
            element="input"
            label="Email"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid technology name."
            onInput={inputHandler}
          />
          <Input
            id="query"
            element="textarea"
            label="Query"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid keywords."
            onInput={inputHandler}
          />
          <Button className="center" type="submit" disabled={!formState.isValid}>
            SUBMIT
          </Button>
        </form>
        <div className="map-frame">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d779.9493284219864!2d77.6519686226367!3d12.918772108467094!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1591222728026!5m2!1sen!2sin"
            width="100%"
            height="400"
            frameborder="0"
            allowfullscreen="true"
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
