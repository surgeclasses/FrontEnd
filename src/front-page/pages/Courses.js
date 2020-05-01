import React, { useEffect, useState } from "react";

import CourseList from "../components/CourseList";

import "./HomePage.css";

const Courses = () => {
  const [loadedCourses, setLoadedCourses] = useState();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses", {
          method: "GET",
        });
        const responseData = await response.json();
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
