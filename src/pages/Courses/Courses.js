import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Courses.css";
import { useHttpClient } from "../../hooks/http-hook";
import CourseList from "./Components/CourseList";

const Courses = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses"
        );
        setLoadedCourses(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);


  return (
    <div className="body">
      <h1>Courses</h1>
      {loadedCourses && <CourseList items={loadedCourses} />}
    </div>
  );
};

export default Courses;
