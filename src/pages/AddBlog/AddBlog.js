import React from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import "./AddBlog.css";

const AddBlog = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      technology: {
        value: 0,
        isValid: false,
      },
      content: {
        value: 0,
        isValid: false,
      },
      keywords: {
        value: "",
        isValid: false,
      },
      metadata: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/blogs`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          technology: formState.inputs.technology.value,
          keywords: formState.inputs.keywords.value,
          content: formState.inputs.content.value,
          metadata: formState.inputs.metadata.value,
          date: formState.inputs.date.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push("/AddBlog");
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
          <Input
            id="technology"
            element="input"
            label="Technology"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid technology name."
            onInput={inputHandler}
          />
          <Input
            id="keywords"
            element="input"
            label="Keywords"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid keywords."
            onInput={inputHandler}
          />
          <Input
            id="content"
            element="textarea"
            label="Content"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid content."
            onInput={inputHandler}
          />
          <Input
            id="metadata"
            element="input"
            label="Metadata"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid metadata."
            onInput={inputHandler}
          />
          <Input
            id="date"
            element="input"
            label="Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid date."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD BLOG
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
