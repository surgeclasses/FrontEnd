import React, { useEffect, useState } from "react";
import firebase from "firebase";

import { useHttpClient } from "../../../hooks/http-hook";
import CourseList from "../../Courses/Components/CourseList";
import LoadingSpinner from '../../../components/LoadingSpinner';

const MyCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/user/findcourses/" +
            firebase.auth().currentUser.email
        );
        setLoadedCourses(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <div className="body">
      <h2 className="center">My Courses</h2>
      <div className="horizontal-scroll">
        {isLoading && <LoadingSpinner />}
        {loadedCourses && <CourseList items={loadedCourses} />}
      </div>
    </div>
  );
};

export default MyCourses;
