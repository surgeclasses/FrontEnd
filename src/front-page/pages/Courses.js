import React, { useEffect, useState } from "react";

import { useHttpClient}  from "../../hooks/http-hook"; 
import CourseList from "../components/CourseList";

import "./HomePage.css";

const Courses = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/courses');
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
