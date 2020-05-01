import React from "react";

import Card from "./Card";

import "./CourseItem.css";

const CourseItem = (props) => {
  return (
    <li className="course-item">
      <Card>
        <h4>{props.title}</h4>₹{props.regfee} worth course in ₹{props.disfee}
      </Card>
    </li>
  );
};

export default CourseItem;
