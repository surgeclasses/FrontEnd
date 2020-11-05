import React, { useEffect, useState, Fragment } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import firebase from "firebase";
import ReactHtmlParser from "react-html-parser";
import { CSSTransition } from "react-transition-group";
import HotTechnologies from '../../HomePage/Components/HotTechnologies'
import {Scrollbars} from 'react-custom-scrollbars'
import Syllabus from './syllabus123.pdf'
import Pic1 from '../../../assets/htlm.png'
import Pic2 from '../../../assets/css.jpg'
import Pic3 from '../../../assets/react.png'
import Pic4 from '../../../assets/node.png'
import Pic5 from '../../../assets/express.png'
import Pic6 from '../../../assets/mongodb.png'
import "./CourseDetails.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Modal from "../../../components/Modal";
import Card from "../../../components/Card";
import LoadingSpinner from "../../../components/LoadingSpinner";
import tagImg from "../../../assets/live-tag.png";
import { FaRegStar, FaChalkboardTeacher, FaRegClock, FaRegCalendarAlt, FaProjectDiagram, FaRProject, FaIndustry, FaLanguage, FaReact, FaNode, FaRegFilePdf, FaRegMoneyBillAlt} from "react-icons/fa";



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
        <Scrollbars 
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax={200}
            thumbMinSize={30}
            universal={true}   
            style={{width:500, height:300}}>
          {items.map((item, i) => (
            <FullListItem key={i} module={item} />
          ))}
        </Scrollbars>
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
                <div className='items'>
                  <div className="icon"><FaChalkboardTeacher/>{loadedCourse.instructor.name}</div>
                  <div className="icon"><FaRegStar/>{loadedCourse.avgRating}</div>
                  <div className="icon"><FaRegClock/>{loadedCourse.duration}</div>
                  <div className="icon"><FaRegCalendarAlt/>{loadedCourse.startDate} </div>   
                  <div className="icon"><FaRegMoneyBillAlt/>Fee: {loadedCourse.fee}</div>   
                </div>
            </div>
            <div className="banner2">
            <button onClick={()=>alert("Successfully Enroll")}>Enroll</button>
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
            <div className="section-course">
            <h2>Who this course is for ?</h2>
            <div className="point">
                  <li><FaIndustry/>     {loadedCourse.whoToLearn.p1}</li>
                  <li><FaChalkboardTeacher/>   {loadedCourse.whoToLearn.p2}</li>
                  <li><FaRProject/>            {loadedCourse.whoToLearn.p3}</li>
                  <li><FaReact/>            {loadedCourse.whoToLearn.p4}</li>
                  <li><FaNode/>            {loadedCourse.whoToLearn.p5}</li>
                  
              </div>
            </div>
            <div className="section-course">
            <h2>Top Skills or Tools you will Learn</h2>
            <div className="image">
            <img src={Pic1}></img>
            <img src={Pic2}></img>
            <img src={Pic3}></img>
            <img src={Pic4}></img>
            <img src={Pic5}></img>
            <img src={Pic6}></img>
            </div>
            </div>
            <div className="section3">
            <h2>
                <div>Syllabus</div>
                <p>Best-in-class content by leading faculty and industry leaders in the form of videos, cases and projects.</p>
                <div className='syllabus'>
              <a href={Syllabus} download="surgeclasses.pdf">  
              <button>
              <FaRegFilePdf/>Download Syllabus
              </button>
              </a> 
            </div>
            </h2>
            </div>
            <div className="content">
            <h2>Course Contents:</h2>
            
            {loadedCourse.syllabus &&  (
              <FullList items={loadedCourse.syllabus}/>
            )}
            </div>
            <br/>
            <br/>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
