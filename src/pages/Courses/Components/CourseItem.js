import React from "react";

import Card from "../../../components/Card";
import banner from '../../../assets/dummy_banner.jpg'

import "./CourseItem.css";

const CourseItem = (props) => {
  return (
    <li className="course-item">
      <Card>
        <img className="course-banner" src={banner}/>
        <h4>{props.title}</h4>
        <p>₹{props.regfee} worth course in ₹{props.disfee}</p>
      </Card>
    </li>
  );
};

export default CourseItem;
