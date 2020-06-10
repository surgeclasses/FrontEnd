import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import "./AddCourse.css";

const AddCourse = () => {
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const [selectedTechnology, setSelectedTechnology] = useState();
  const [isLive, setIsLive] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      fee: {
        value: 0,
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      instructor: {
        value: "",
        isValid: false,
      },
      duration: {
        value: 0,
        isValid: false,
      },
      isLive: {
        value: false,
        isValid: true,
      },
      startDate: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/technologies"
        );
        setLoadedTechnologies(responseData);
        setSelectedTechnology(responseData[0]._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTechnologies();
  }, []);

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
    console.log(selectedTechnology); // send this to the backend!
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          fee: formState.inputs.fee.value,
          technology: selectedTechnology,
          description: formState.inputs.description.value,
          instructor: formState.inputs.instructor.value,
          duration: formState.inputs.duration.value,
          isLive: isLive,
          startDate: formState.inputs.startDate.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push("/AddCourse");
    } catch (err) {
      console.log(err);
    }
  };

  const techSelectHandler = (event) => {
    setSelectedTechnology(event.target.value);
  };

  const liveChangeHandler = (event) => {
    setIsLive(event.target.checked);
  };

  return (
    <div className="body">
      <h1 className="center">Add A New Course</h1>
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
            id="fee"
            element="input"
            label="Fee"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid course fee."
            onInput={inputHandler}
          />
          <select
            className="selector"
            onChange={techSelectHandler}
            name="technology"
            id="technology"
          >
            {loadedTechnologies &&
              loadedTechnologies.map((technology) => {
                return (
                  <option value={technology._id}>{technology.title}</option>
                );
              })}
          </select>
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(20)]}
            errorText="Please enter a valid description (at least 20 characters)."
            onInput={inputHandler}
          />
          <Input
            id="instructor"
            element="input"
            label="Instructor"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid instructor name."
            onInput={inputHandler}
          />
          <Input
            id="duration"
            element="input"
            label="Duration (Hours)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid course duration (in Hours)."
            onInput={inputHandler}
          />
          <input
            id="isLive"
            type="checkbox"
            name="isLive"
            onChange={liveChangeHandler}
          />
          <label for="isLive">Is Course Live</label>
          <Input
            id="startDate"
            element="input"
            label="Start Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid starting date."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD COURSE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
