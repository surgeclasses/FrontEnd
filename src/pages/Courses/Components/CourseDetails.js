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
import { FaRegStar, FaUserTie, FaChalkboardTeacher, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

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
            <div className="course-head">
              <div className="course-intro">
                <h1>{loadedCourse.title}</h1>
                {loadedCourse.isLive && <img src={tagImg} />}
                <h2 className="course-description">
                  {ReactHtmlParser(loadedCourse.description)}
                </h2>
                <div className="course-highlights">
                  <div className="course-highlights-item">
                    <FaChalkboardTeacher/> {loadedCourse.instructor.name}
                  </div>
                  <div className="course-highlights-item">
                    5 <FaRegStar />
                  </div>
                  <div className="course-highlights-item">
                    <FaRegClock/> {loadedCourse.duration} Hours
                  </div>
                  <div className="course-highlights-item">
                    <FaRegCalendarAlt/> {loadedCourse.startDate}
                  </div>
                </div>
              </div>
              <Card className="purchase-card">
                {!isApplied && <h2>Fee: ₹{loadedCourse.fee}</h2>}
                {!isApplied && (
                  <button
                    onClick={applyCourse}
                    disabled={isApplied}
                    className="button button-default"
                  >
                    Enrol
                  </button>
                )}
                {isApplied && (
                  <button onClick={startCourse} className="button button-default">
                    Start
                  </button>
                )}
              </Card>
            </div>
            <div className="full-course-description">
              <p>{ReactHtmlParser(loadedCourse.description)}</p>
            </div>
            <div className="course-overview">
              <h2>Course Contents</h2>
              {loadedCourse.syllabus && (
                <FullList items={loadedCourse.syllabus} />
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
