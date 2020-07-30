import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import ReactHtmlParser from "react-html-parser";

import { useHttpClient } from "../../hooks/http-hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import "./Instructor.css";
import { AuthContext } from "../../context/auth-context";

const Instructor = () => {
  const auth = useContext(AuthContext);
  const [isInstructor, setIsInstructor] = useState(false);
  const [instructorProfile, setInstructorProfile] = useState();
  const [instructorCourses, setInstructorCourses] = useState();
  //   const [isLive, setIsLive] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: 0,
        isValid: false,
      },
      experience: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/user/" +
            firebase.auth().currentUser.email
        );
          setIsInstructor(responseData.isInstructor);
          auth.isInstructor = responseData.isInstructor;
          console.log(auth.isInstructor);
        
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

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/courses/instructor/" +
            instructorProfile._id
        );
        setInstructorCourses(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInstructorCourses();
  });

  const history = useHistory();
  const editCourseListener = (cid) => {
    history.push("/ManageCourse/" + cid);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/instructor`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          experience: formState.inputs.experience.value,
          description: formState.inputs.description.value,
          user: auth.userid,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/user/makeinstructor/${auth.userid}`,
        "POST",
        JSON.stringify({
          instructorProfile: responseData._id,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.isInstructor= true;

      history.push("/Instructor");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      <Modal error={error} onClear={clearError} />
      {isInstructor && instructorProfile && (
        <div>
          <br />
          <Card className="profile-card">
            <h3>{instructorProfile.name}</h3>
            <p>
              <b>Experience:</b> {instructorProfile.experience}
            </p>
            <p>
              <b>Description:</b> {instructorProfile.description}
            </p>
          </Card>
        </div>
      )}
      {!isInstructor && (
        <div className="form-container">
          <h1 className="center">Fill Profile For Instructor</h1>
          <form className="form" onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
            />
            <Input
              id="experience"
              element="input"
              label="Experience"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid experience."
              onInput={inputHandler}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(20)]}
              errorText="Please enter a valid description (at least 20 characters)."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Save Profile
            </Button>
          </form>
        </div>
      )}
      {instructorCourses && (
        <ul className="inst-course-list">
          {instructorCourses.map((course) => {
            return (
              <li
                className="inst-course-card"
                onClick={() => editCourseListener(course._id)}
              >
                <Card>
                  <h4>{course.title}</h4>
                  <p className="course-description">
                    {ReactHtmlParser(course.description)}
                  </p>
                  <br />
                  <span>₹{course.fee}</span>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Instructor;
