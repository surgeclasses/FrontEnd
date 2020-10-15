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
      <Modal error={error} onClear={clearError} />
      <div className="form-container">
        <form className="contact-form" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2 className="center">Contact Form</h2>
          <hr />
          <Input
            id="name"
            element="input"
            placeholder="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          <Input
            id="email"
            element="input"
            placeholder="Email"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid technology name."
            onInput={inputHandler}
          />
          <Input
            id="query"
            element="textarea"
            label="Query"
            placeholder="Ask your query here..."
            rows="5"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid keywords."
            onInput={inputHandler}
          />
          <Button
            className="center"
            type="submit"
            disabled={!formState.isValid}
          >
            SUBMIT
          </Button>
        </form>
        <hr />
        {/* <div className="map-frame">
          <iframe
            className="map"
            // src="https://maps.google.com/maps?q=12.918668, 77.652067&z=15&output=embed"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d972.2074071748577!2d77.65151982915206!3d12.91866930659018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU1JzA3LjIiTiA3N8KwMzknMDcuNCJF!5e0!3m2!1sen!2sin!4v1591262722159!5m2!1sen!2sin"
            width="600"
            height="450"
            frameborder="0"
            allowfullscreen="true"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
