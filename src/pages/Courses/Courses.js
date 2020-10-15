import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Courses.css";
import { useHttpClient } from "../../hooks/http-hook";
import CourseList from "./Components/CourseList";

const programs = ['Data Science', 'MERN', 'Android Devlopment']

const Courses = (props) => {
  const [loadedCourses, setLoadedCourses] = useState();
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/technologies"
        );
        setLoadedTechnologies(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTechnologies();
  }, []);


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

  const history = useHistory();
  const itemClickListener = (id, loadedCourses) => {
    // history.push({ pathname: "/CourseDetails", state: props });
    // history.push("/CourseDetails/" + courseId);
    console.log(id)
    const showCourses = loadedCourses.filter((el) => {
      return el.technology == id
    })
    console.log(showCourses)
    const courseId = showCourses[0]._id
    history.push("/CourseDetails/" + courseId);
  };
  

  return (
    <div className="body">
      {/* <h1 className="center">Offered Courses</h1> */}
      {/* {loadedCourses && <CourseList items={loadedCourses} />} */}
      <div className="programs-sidebar">
        <h3>Offered Programs</h3>
        <div className="programs">
          {loadedTechnologies && loadedTechnologies.map((item, index) => (
            <li key={index} onClick={()=>itemClickListener(item._id, loadedCourses)}>{item.title}</li>
          ))}
        </div>
      </div>
      <div className="show-course">

      </div>
    </div>
  );
};

export default Courses;
