import React, { useEffect, useState, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";

// import "./CourseDetails.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";

const UpdateCourse = () => {
  const [loadedCourse, setLoadedCourse] = useState();
  const [isLive, setIsLive] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      fee: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      instructor: {
        value: "",
        isValid: true,
      },
      duration: {
        value: "",
        isValid: true,
      },
      isLive: {
        value: "",
        isValid: true,
      },
      startDate: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  let { cid } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        setLoadedCourse(responseData);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            fee: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.title,
              isValid: true,
            },
            instructor: {
              value: responseData.instructor,
              isValid: true,
            },
            duration: {
              value: responseData.duration,
              isValid: true,
            },
            isLive: {
              value: responseData.isLive,
              isValid: true,
            },
            startDate: {
              value: responseData.startDate,
              isValid: true,
            },
          },
          true
        );
        setIsLive(responseData.isLive);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, []);

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/${cid}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          fee: formState.inputs.fee.value,
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

      history.push("/EditCourse");
    } catch (err) {
      console.log(err);
    }
  };

  const editSyllabusHandler = () => {
    history.push("/AddSyllabus/" + loadedCourse._id);
  };

  const liveChangeHandler = (event) => {
    setIsLive(event.target.checked);
  };

  return (
    <div className="body">
      <Modal error={error} clearError={clearError} />
      {isLoading && <LoadingSpinner />}
      {loadedCourse && (
        <div className="form-container">
          <form className="form" onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              initialValue={loadedCourse.title}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
            />
            <Input
              id="fee"
              element="input"
              label="Fee"
              initialValue={loadedCourse.fee}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid course fee."
              onInput={inputHandler}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              initialValue={loadedCourse.description}
              validators={[VALIDATOR_MINLENGTH(20)]}
              errorText="Please enter a valid description (at least 20 characters)."
              onInput={inputHandler}
            />
            <Input
              id="instructor"
              element="input"
              label="Instructor"
              initialValue={loadedCourse.instructor}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid instructor name."
              onInput={inputHandler}
            />
            <Input
              id="duration"
              element="input"
              label="Duration (Hours)"
              initialValue={loadedCourse.duration}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid course duration (in Hours)."
              onInput={inputHandler}
            />
            <input
              id="isLive"
              type="checkbox"
              name="isLive"
              value={loadedCourse.isLive}
              checked={loadedCourse.isLive}
              onChange={liveChangeHandler}
            />
            <label for="isLive">Is Course Live</label>
            <Input
              id="startDate"
              element="input"
              label="Start Date"
              initialValue={loadedCourse.startDate}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid starting date."
              onInput={inputHandler}
            />
            <Button type="submit">Update Course</Button>
            <Button onClick={editSyllabusHandler}>Edit Syllabus</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateCourse;
