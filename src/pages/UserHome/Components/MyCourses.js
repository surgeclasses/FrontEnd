import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import CourseList from "../../Courses/Components/CourseList";

const MyCourses = () => {
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
    <div className="top-courses">
      <h3 className="section-title">My Courses</h3>
      <div className="horizontal-scroll">
        {loadedCourses && <CourseList items={loadedCourses} />}
      </div>
    </div>
  );
};

export default MyCourses;