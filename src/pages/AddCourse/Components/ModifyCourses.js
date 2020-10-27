import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import "./ModifyCourses.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Card from "../../../components/Card";
import Modal from "../../../components/Modal";

const ModifyCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses"
        );
        if (!isLoading) setLoadedCourses(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);

  const addButtonClickHandler = () => {
    history.push("/AddCourse");
  };
  const history = useHistory();
  const editCourseListener = (cid) => {
    history.push("/UpdateCourse/" + cid);
  };

  return (
    <div className="body">
      <h1>Courses</h1>
      <Modal error={error} clearError={clearError} />
      <button
        className="button button-default button-right"
        onClick={addButtonClickHandler}
      >
        Add Course
      </button>
      {loadedCourses && (
        <ul className="course-list">
          {loadedCourses.map((course) => {
            return (
              <li
                className="edit-course-card"
                onClick={() => editCourseListener(course._id)}
              >
                <Card>
                  <h4>{course.title}</h4>
                  <p className="course-description">{ReactHtmlParser(course.description)}</p>
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

export default ModifyCourses;
