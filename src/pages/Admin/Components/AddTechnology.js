import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../../hooks/http-hook";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Modal from "../../../components/Modal";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";
import "./AddTechnology.css";
import Technologies from "../../Blogs/Components/Technologies";

const AddTechnology = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
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
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/technologies`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      <h1 className="center">Add A New Blog</h1>
      <Modal error={error} onClear={clearError} />
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Add Technology
          </Button>
        </form>
      </div>
      <Technologies/>
    </div>
  );
};

export default AddTechnology;
