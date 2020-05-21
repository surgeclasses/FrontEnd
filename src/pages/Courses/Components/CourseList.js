import React from "react";

import "./CourseList.css";
import CourseItem from "./CourseItem";

const CourseList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Courses Found</h2>
      </div>
    );
  }
  return (
    <ul className="course-list">
      {props.items.map((course) => {
        return (
          <CourseItem
            key={course.id}
            id={course.id}
            title={course.title}
            regfee={course.regfee}
            disfee={course.disfee}
          />
        );
      })}
    </ul>
  );
};

export default CourseList;
