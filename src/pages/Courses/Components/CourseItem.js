import React from "react";

import Card from "../../../components/Card";
import banner from '../../../assets/dummy_banner.jpg';
import tagImg from '../../../assets/live-tag.png';

import "./CourseItem.css";

const CourseItem = (props) => {
  return (
    <li className="course-item">
      <Card>
        <img className="course-banner" src={banner}/>
        { props.isLive &&<img className="live-tag" src={tagImg}/>}
        <h4>{props.title}</h4>
        <p>{props.description}<br/>₹{props.fee}</p>
      </Card>
    </li>
  );
};

export default CourseItem;
