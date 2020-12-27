import React, { useEffect, useState, Fragment } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import firebase from "firebase";
import ReactHtmlParser from "react-html-parser";
import { CSSTransition } from "react-transition-group";
import HotTechnologies from "../../HomePage/Components/HotTechnologies";
import { Scrollbars } from "react-custom-scrollbars";
import Syllabus from "./syllabus123.pdf";
import Pic1 from "../../../assets/htlm-removebg-preview.png";
import Pic2 from "../../../assets/css-removebg-preview.png";
import Pic3 from "../../../assets/react-removebg-preview.png";
import Pic4 from "../../../assets/node-removebg-preview.png";
import Pic5 from "../../../assets/express-removebg-preview.png";
import Pic6 from "../../../assets/mongodb-removebg-preview.png";
import "./CourseDetails.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Modal from "../../../components/Modal";
import Card from "../../../components/Card";
import LoadingSpinner from "../../../components/LoadingSpinner";
import tagImg from "../../../assets/live-tag.png";
import {
  FaRegStar,
  FaChalkboardTeacher,
  FaRegClock,
  FaRegCalendarAlt,
  FaProjectDiagram,
  FaRProject,
  FaIndustry,
  FaLanguage,
  FaReact,
  FaNode,
  FaRegFilePdf,
  FaRegMoneyBillAlt,
} from "react-icons/fa";

import { AiTwotoneAppstore, AiFillRead } from "react-icons/ai";
import CoursesNavBar from "../../../components/CoursesNavBar";

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
          <div className="list">
            <Scrollbars
              className="Scollbars"
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={310}
              autoHeightMin={300}
              autoHeightMax={500}
              thumbMinSize={30}
              universal={true}
              style={{ width: 500, height: 300 }}
            >
              <div className="course-fullList">
                {items.map((item, i) => (
                  <FullListItem
                    className="FullListItem"
                    key={i}
                    module={item}
                  />
                ))}
              </div>
            </Scrollbars>
          </div>
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
    console.log(id);
    const showCourses = loadedCourses.filter((el) => {
      return el.technology == id;
    });
    // console.log(showCourses)
    const courseId = showCourses[0]._id;
    history.push("/CourseDetails/" + courseId);
  };

  return (
    <div className="body">
      <div className="head">
        <Modal error={error} clearError={clearError} />
        {isLoading && <LoadingSpinner />}
        {loadedCourse && (
          <Fragment>
            <div className="header">
              <div class="course-hover-nav">
                <nav>
                  <ul class="nav">
                    <li>
                      <a>Courses</a>
                      <ul>
                        {loadedTechnologies &&
                          loadedTechnologies.map((item, index) => (
                            <li key={index}>
                              <a>{item.title}</a>
                              <ul>
                                {item.courses.map((p) => (
                                  <CoursesNavBar
                                    title={p.title}
                                    description={p.description}
                                    instructor={p.instructor}
                                    cid={p.cid}
                                  />
                                ))}
                              </ul>
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="course-header">
                <div className="c-header">
                  <br />
                  <h1 className="h1">{loadedCourse.title} </h1>
                  {/* <h2>{loadedCourse.description}</h2> */}
                  {/* <p className="course-about1"> Whole Era is changing. This is time of Everything Digital. We here at Surge Classes brought that unexplored digital world in your hand</p> */}
                  {/* <p className="course-about2"> Join US </p> */}
                  <p className="course-about3">{loadedCourse.description} </p>
                  {/* <p className="course-about4"> Interesting? <br/> Yes...Its More.. <br/> Enroll Now. </p> */}
                    <div className="banner">
                      <div className="items">
                        <div className="icon">
                          <FaChalkboardTeacher
                            style={{ marginRight: "0.4rem" }}
                          />
                          {loadedCourse.instructor.name}
                        </div>
                        <div className="icon">
                          <FaRegStar style={{ marginRight: "0.4rem" }} />
                          {loadedCourse.avgRating}
                        </div>
                        <div className="icon">
                          <FaRegClock style={{ marginRight: "0.4rem" }} />
                          {loadedCourse.duration}
                        </div>
                        <div className="icon">
                          <FaRegCalendarAlt style={{ marginRight: "0.4rem" }} />
                          {loadedCourse.startDate}
                        </div>
                        <div className="icon">
                          <FaRegMoneyBillAlt
                            style={{ marginRight: "0.4rem" }}
                          />
                          Fee: ₹{loadedCourse.fee}/-
                        </div>
                      </div>
                    </div>
                    <div className="banner2">
                      <button onClick={() => alert("Successfully Enroll")}>
                        Enroll
                      </button>
                    </div>
                  <br />
                  <br />
                </div>
              </div>
              <div className="sec">
                <div className="section2">
                  <hr />
                  <br />
                  <br />
                  <h2>
                    <AiTwotoneAppstore /> Course Overview
                  </h2>
                  <h3>Key Features:</h3>
                  <div className="point">
                    {loadedCourse.keyFeatures.map((p) => (
                      <li style={{ listStyleType: "circle" }}>
                        {p.keyFeatures}
                      </li>
                    ))}
                  </div>
                </div>
                <br />
              </div>
              <div className="course-details">
                <div className="section-course">
                  <h2>Who this course is for ?</h2>
                  <div className="point1">
                    {loadedCourse.whotoLearn.map((p) => (
                      <li style={{ listStyleType: "square" }}>
                        {p.whotoLearn}
                      </li>
                    ))}
                  </div>
                </div>
                <div className="section-course">
                  <h2>Top Skills or Tools you will Learn</h2>
                  <div className="image">
                    <img src={Pic1} width="70" height="70"></img>
                    <img src={Pic2} width="70" height="70"></img>
                    <img src={Pic3} width="135" height="70"></img>
                    <img src={Pic4} width="115" height="70"></img>
                    <img src={Pic5} width="125" height="70"></img>
                    <img src={Pic6} width="140" height="70"></img>
                  </div>
                </div>
                <h2 className="courseContent-heading">Course Contents:</h2>
                <div className="content-syllabus">
                  <div className="content topics-box">
                    {loadedCourse.syllabus && (
                      <FullList items={loadedCourse.syllabus} />
                    )}
                  </div>
                  <div className="content syllabus-box">
                    <h2 className="Syllabus-h2style">
                         Download Syllabus from here:{" "}
                    </h2>
                    <div className="box">
                    <div className="icon">
                      <AiFillRead
                        className="fa fa-search"
                        aria-aria-hidden="true"
                      />
                    </div>
                    <div className="syllabus-words">
                      <h3>Syllabus</h3>
                      <p>
                        Best-in-class content by leading faculty and industry
                        leaders in the form of videos, cases and projects.
                      </p>
                      <a href={Syllabus} download="surgeclasses.pdf">
                        <button className="download-button">
                         
                          Download Syllabus
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
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
