import React , {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import Card from "../../../components/Card";
import banner from "../../../assets/course_img.jpg";
import tagImg from "../../../assets/live-tag.png";
// import course_img from "../../../assets/course-img.jpg"
import dataScience_img from "../../../assets/course-img.jpg"
import WebMERN from "../../../assets/course-mern3.jpg"
import dataScience from "../../../assets/course-data4.jpg"
// import AndroidBasics from "../../../assets/course-androidBasics.png"
import AndroidAdvance from "../../../assets/course-androidAdvance.png"
import AndroidBasics from "../../../assets/course-andro1.jpg"
// import AndroidAdvance from "../../../assets/course-androidAdvance.png"
import "./CourseItem.css";

const CourseItem = (props) => {
  const history = useHistory();
  const courseId = props.id;

  const [course_img, setCourse_img] = useState(dataScience_img);

  const courseBanner = [
    {
      title: "MERN",
      courseid: "5ef07fc2be4c7b29184c380c",
      imageURL:WebMERN,
    },
    {
      title: "Data_Science",
      courseid: "5ef347fb30245c415414dd1e",
      imageURL:dataScience,
    },
    {
      title: "AndroidDev_Basics",
      courseid: "5eff00e64f2225332c39f8f5",
      imageURL:AndroidBasics,
    },
    {
      title: "AndroidDev_Advance",
      courseid: "5eff02304f2225332c39f8f6",
      imageURL:AndroidAdvance,
    },
  ]


  // console.log(props);
  const itemClickListener = () => {
    // history.push({ pathname: "/CourseDetails", state: props });
    history.push("/CourseDetails/" + courseId);
  };

  // const sectionStyle = {
  //   backgroundImage: `url(${WebMERN})`,
  //   width: "100%",
  //   height: "10vh",
  //   // padding-bott: "1px",
  // };

  let requiredImage,requiredArray;

  useEffect(() => {
    const setCourseBannerUrl = async () => {
      try {
        // .toString()
        requiredArray=courseBanner.filter((item)=>item.courseid===props.id);
        requiredImage=requiredArray[0].imageURL;
        console.log({requiredImage})
        setCourse_img(requiredImage);
        // console.log({course_img});        
      } catch (err) {
        console.log({err});
      }
    };
    console.log({course_img});
    setCourseBannerUrl();
  }, []);

  return (
    <li className="course-item" onClick={itemClickListener}>
      {/* <img className="course-banner" src={banner} /> */}
      {/* <div className="banner-overlay">Content</div> */}
      <Card className="courseList-card">
        {props.isLive && <img className="live-tag" src={tagImg} />}
        {/* <section style={ sectionStyle } /> */}
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
