import React from "react";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import Card from "../../../components/Card";
import banner from "../../../assets/course_img.jpg";
import tagImg from "../../../assets/live-tag.png";
import course_img from "../../../assets/course-img.jpg"
import "./CourseItem.css";

const CourseItem = (props) => {
  const history = useHistory();
  const courseId = props.id;
  // console.log(props);
  const itemClickListener = () => {
    // history.push({ pathname: "/CourseDetails", state: props });
    history.push("/CourseDetails/" + courseId);
  };

  return (
    <li className="course-item" onClick={itemClickListener}>
      {/* <img className="course-banner" src={banner} /> */}
      {/* <div className="banner-overlay">Content</div> */}
      <Card className="courseList-card">
        {props.isLive && <img className="live-tag" src={tagImg} />}
        <img className="course-image" src={course_img}/>
        <hr/>
        {/* <p className="course-image"> Course </p> */}
        <h4>{props.title}</h4>
        <p>{ReactHtmlParser(props.description)}</p>
        {/* <span>₹{props.fee}</span> */}
      </Card>
    </li>
  );
};

export default CourseItem;
