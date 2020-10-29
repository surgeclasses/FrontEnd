import React, { useEffect, useState, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebase from "firebase";
import ReactHtmlParser from "react-html-parser";
import { CSSTransition } from "react-transition-group";
import HotTechnologies from '../../HomePage/Components/HotTechnologies'

import "./CourseDetails.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Modal from "../../../components/Modal";
import Card from "../../../components/Card";
import LoadingSpinner from "../../../components/LoadingSpinner";
import tagImg from "../../../assets/live-tag.png";
import { FaRegStar, FaChalkboardTeacher, FaRegClock, FaRegCalendarAlt, FaProjectDiagram, FaRProject, FaIndustry, FaLanguage, FaReact, FaNode, FaHtml5, FaJava, FaStar, FaNodeJs, FaFile, FaRegFilePdf, FaRegMoneyBillAlt} from "react-icons/fa";

const DUMMY = [
  'Introduction','MERN Theoretically.',
  'Target Application and Its Planning.','Frontend','Backend','Database.',
   'Building the Full Stack.','Additional Features.','Deployment','Closure'
]

const CourseDetails = () => {
  const [loadedCourse, setLoadedCourse] = useState();
  const [loadedCourses, setLoadedCourses] = useState();
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const [isApplied, setIsApplied] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  let { cid } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        console.log(responseData);
        setLoadedCourse(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, [cid]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/user/" +
            firebase.auth().currentUser.email
        );
        userData.attendingCourses.map((courseId) => {
          if (courseId == cid) setIsApplied(true);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const applyCourse = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/user/addmycourse",
        "PATCH",
        JSON.stringify({
          email: firebase.auth().currentUser.email,
          courseId: loadedCourse._id,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const startCourse = () => {
    history.push("/Lectures/" + cid);
  };

  const ListItem = ({ value }) => <li>{value}</li>;

  const List = ({ items, show }) => (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <ul className="module-list">
        {items.map((item, i) => (
          <ListItem key={i} value={item.topic} />
        ))}
      </ul>
    </CSSTransition>
  );

  const FullListItem = ({ module }) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const openList = () => {
      setIsListOpen(!isListOpen);
    };
    if (!!module) {
      return (
        <li>
          <br />
          <h3 onClick={openList}>{module.title}</h3>
          {<List show={isListOpen} items={module.topics} />}
        </li>
      );
    } else {
      return "";
    }
  };

  const FullList = ({ items }) => {
    if (items.length > 0) {
      return (
        <ul className="syllabus-list">
          {items.map((item, i) => (
            <FullListItem key={i} module={item} />
          ))}
        </ul>
      );
    } else {
      return "";
    }
  };

  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/technologies"
        );
        console.log(responseData)
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

  // const history = useHistory();
  const itemClickListener = (id) => {
    // history.push({ pathname: "/CourseDetails", state: props });
    // history.push("/CourseDetails/" + courseId);
    console.log(id)
    const showCourses = loadedCourses.filter((el) => {
      return el.technology == id
    })
    // console.log(showCourses)
    const courseId = showCourses[0]._id
    history.push("/CourseDetails/" + courseId);
  };


  return (
    <div className="body">
      <div className="programs-bar">
        <h3 className="programs-title">Offered Programs</h3>
        <ul className="programs">
          {loadedTechnologies && loadedTechnologies.map((item, index) => (
            <li key={index} onClick={()=>itemClickListener(item._id)}>
              <div className="list-card">
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div >
        <Modal error={error} clearError={clearError} />
        {isLoading && <LoadingSpinner />}
        {loadedCourse && (
          <Fragment>
            <div>
            <div className="course-header">
            <h1 className="h1">{loadedCourse.title} </h1>
            <h2>{loadedCourse.description}</h2>
            <div className="partition">
            <div className='banner'>
                <div className='item'>
                  <div className="icon"><FaChalkboardTeacher/>{loadedCourse.instructor.name}</div>
                  <div className="icon"><FaRegStar/>{loadedCourse.avgRating}</div>
                  <div className="icon"><FaRegClock/>{loadedCourse.duration}</div>
                  <div className="icon"><FaRegCalendarAlt/>{loadedCourse.startDate} </div>   
                  <div className="icon"><FaRegMoneyBillAlt/>Fee: {loadedCourse.fee}</div>   
                </div>
            </div>
            <div className="banner2">
              <button onClick={()=>alert("Successfully Enroll")}>Enroll Now</button>
            </div>
            </div>
            <br/>
            </div>    
            <div className="section2">
              <h2>Course Overview</h2>
              <h3>Key Features:</h3>
              <div className="point">
                  <li><FaIndustry/>     {loadedCourse.keyFeatures.p1}</li>
                  <li><FaChalkboardTeacher/>   {loadedCourse.keyFeatures.p2}</li>
                  <li><FaRProject/>            {loadedCourse.keyFeatures.p3}</li>
                  <li><FaLanguage/>            {loadedCourse.keyFeatures.p4}</li>
                  <li><FaRegClock/>            {loadedCourse.keyFeatures.p5}</li>
                  <li><FaProjectDiagram/>   {loadedCourse.keyFeatures.p6}</li>
              </div>
            </div>
            <hr/>
            <div className="section3">
            <h2>Who this course is for ?</h2>
            <div className="point">
                  <li><FaIndustry/>     {loadedCourse.whoToLearn.p1}</li>
                  <li><FaChalkboardTeacher/>   {loadedCourse.whoToLearn.p2}</li>
                  <li><FaRProject/>            {loadedCourse.whoToLearn.p3}</li>
                  <li><FaReact/>            {loadedCourse.whoToLearn.p4}</li>
                  <li><FaNode/>            {loadedCourse.whoToLearn.p5}</li>
                  
              </div>
            </div>
            <div className="section3">
            <h2>Top Skills or Tools you will Learn</h2>
            {/* <div className="point">
                  <li><FaHtml5/>     {loadedCourse.skills.p1}</li>
                  <li><FaJava/>   {loadedCourse.skills.p2}</li>
                  <li><FaStar/>            {loadedCourse.skills.p3}</li>
                  <li><FaReact/>            {loadedCourse.skills.p4}</li>
                  <li><FaNodeJs/>            {loadedCourse.skills.p5}</li>
                  <li><FaNode/>            {loadedCourse.skills.p6}</li>
                  <li><FaStar/>            {loadedCourse.skills.p7}</li>
                  <li><FaFile/>            {loadedCourse.skills.p8}</li>
                  <li><FaRProject/>            {loadedCourse.skills.p9}</li>
                  
              </div> */}
            </div>
            <div className="section3">
            <h2>
                <div>Syllabus</div>
                <p>Best-in-class content by leading faculty and industry leaders in the form of videos, cases and projects.</p>
                <div className='syllabus'>
                  <button onClick={()=>alert("Syllabus is successfully Download")}><FaRegFilePdf/>  Download Syllabus</button>   
                </div>
            </h2>
            
            </div>
            <div className="content">
            <h2>Course Contents:</h2>
            <div>
            { DUMMY.map(item=>(
            <React.Fragment>
            <li onClick={()=>console.log("YAsh")}>{item}</li>
            <div className="list">
            <li>What is MERN Stack?</li> 
            <li>MERN Overview.</li>
            <li>Course Outline.</li>
            </div>
            </React.Fragment>))}
            </div>
            </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
