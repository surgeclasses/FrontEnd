<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
=======
import {useParams, useHistory, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import firebase from "firebase";
import { CSSTransition } from "react-transition-group";

>>>>>>> ca524d1bef69b70271ee7dd6ca4d576027d7f36b
import "./Navlinks";
import "./Navbar.css";
import Navlinks from "./Navlinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import CoursesNavBar from './CoursesNavBar';
import Logo from "../assets/logo.png";
import Button from "./Button";
import {useHttpClient} from '../hooks/http-hook';


import { useHttpClient } from "../hooks/http-hook";
import Modal from "../components/Modal";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const Navbar = (props) => {
<<<<<<< HEAD

=======
>>>>>>> ca524d1bef69b70271ee7dd6ca4d576027d7f36b
  const history = useHistory();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const location = useLocation();
  const [loadedCourse, setLoadedCourse] = useState();
  const [loadedCourses, setLoadedCourses] = useState();
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const [isApplied, setIsApplied] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // console.log(location.pathname);
  let { cid } = useParams();

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const goToHome = () =>{
    history.push('/');
  }

  useEffect(() => {
<<<<<<< HEAD
=======
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
>>>>>>> ca524d1bef69b70271ee7dd6ca4d576027d7f36b
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

<<<<<<< HEAD

  

  
  
=======
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
    console.log(showCourses)
    const courseId = showCourses[0]._id
    history.push("/CourseDetails/" + courseId);
  };
>>>>>>> ca524d1bef69b70271ee7dd6ca4d576027d7f36b

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-navigation__drawer-nav">
          <Navlinks />
        </nav>
      </SideDrawer>

      <header className={`main-header ${(location.pathname!=='/') && 'home-header'}`}>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <div className="main-navigation__brand" onClick={goToHome}>
          {/*<img src={Logo} className="logo" /> */}
          <div>
          <h1 className="main-navigation__title">
            Surge Classes
            {/* <sub className="classes-subscript">
              <sub>classes</sub>
            </sub>            */}
          </h1>
<<<<<<< HEAD
=======
          <div class="dropdown">
          <button class="dropbtn">Courses</button>
          <div class="dropdown-content">
            {loadedTechnologies && loadedTechnologies.map((item, index) => (
              <a key={index} onClick={()=>itemClickListener(item._id)}>
                {item.title}
                {/* <div className="list-card">           
                </div> */}
              </a>
            ))}
>>>>>>> ca524d1bef69b70271ee7dd6ca4d576027d7f36b
          </div>
          <div>
          <nav>
          <ul class="nav">
            
            <li><a>Courses</a>
              <ul>
              {loadedTechnologies && loadedTechnologies.map((item, index) => (
                <li 
                  key={index} 
                >
                <a>{item.title}</a>
                <ul>
                    {item.courses.map(p=>
                      <CoursesNavBar 
                        title={p.title}
                        description={p.description}
                        cid={p.cid}/>
                     
                      )}
                </ul>
              </li>
              ))}
             </ul>
            </li>
          </ul>
        </nav>
        </div>
        
        </div>
        <nav className="main-navigation__header-nav">
          <Navlinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
