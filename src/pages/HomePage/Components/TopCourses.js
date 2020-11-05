import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import CourseList from "../../Courses/Components/CourseList";
import './TopCourses.css';

import { BsChevronDoubleLeft,BsChevronDoubleRight } from "react-icons/bs";

const TopCourses = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const scrollRef=React.createRef();

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
    <React.Fragment>
    <div className="top-courses" >
      <h3 className="section-title">Courses</h3>
      
      <div className="horizontal-scroll" ref={scrollRef}>
      <BsChevronDoubleLeft className="caret-left" onClick={()=>{scrollRef.current.scrollLeft -= 605}}/>
      <BsChevronDoubleRight className="caret-right" onClick={()=>{scrollRef.current.scrollLeft += 605}}/>
        {loadedCourses && <CourseList items={loadedCourses} />}
      </div>
      
    </div>
    
    </React.Fragment>
  );
};

export default TopCourses;
