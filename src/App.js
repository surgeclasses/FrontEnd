import React, { useState, useCallback, useEffect, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import firebase from "firebase";
import { useHttpClient } from "./hooks/http-hook";

import HomePage from "./pages/HomePage/HomePage";
import UserHome from "./pages/UserHome/UserHome";
import Courses from "./pages/Courses/Courses";
import Blogs from "./pages/Blogs/Blogs";
import Auth from "./pages/Auth/Auth";
import Admin from "./pages/Admin/Admin";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContext } from "./context/auth-context";
import { AdminContext } from "./context/admin-context";
import Lecture from "./pages/Lecture/Lecture";
import Forum from "./pages/Forum/Forum";
import AddCourse from "./pages/AddCourse/AddCourse";
import AddBlog from "./pages/AddBlog/AddBlog";
import AddTechnology from "./pages/Admin/Components/AddTechnology";
import CourseDetails from "./pages/Courses/Components/CourseDetails";
import UserNav from "./components/UserNav";
import ReadBlog from "./pages/Blogs/Components/ReadBlog";
import UpdateCourse from "./pages/AddCourse/Components/UpdateCourse";
import ModifyCourses from "./pages/AddCourse/Components/ModifyCourses";
import AddSyllabus from "./pages/AddCourse/Components/AddSyllabus";
import AddVideos from "./pages/AddCourse/Components/AddVideos";
import Instructor from "./pages/Instructor/Instructor";
import ManageCourse from "./pages/Instructor/Components/ManageCourse";
import MyCourses from "./pages/UserHome/Components/MyCourses";
import Enquiries from "./pages/Admin/Components/Enquiries";
import DemoClass from "./pages/HomePage/Components/DemoClass";
import BecomeInstructor from "./pages/HomePage/Components/BecomeInstructor";
import ChatApp from "./pages/ChatDiscussion/ChatApp";
import Chat from "./pages/ChatDiscussion/Chat";
import StartChat from "./pages/ChatDiscussion/StartChat";

function App() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  });

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!!user) {
        console.log(user);
        setUserEmail(user.email);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: user.email,
          })
        );
        login();
      } else {
        localStorage.removeItem("userData");
        logout();
      }
    });
  }, []);

  useEffect(() => {
    const createUpdateUser = async () => {
        //check if the user already exists
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL +
              "/user/" +
              firebase.auth().currentUser.email
          );
          console.log("sending response", responseData._id);
          setUserId(responseData._id);
        } catch (err) {
          console.log(err);
        }
    };
    createUpdateUser();
  }, [isLoggedIn]);

  const loginAdmin = useCallback(() => {
    setIsAdmin(true);
  });

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
  });

  useEffect(() => {
    if (!!firebase.auth().currentUser) {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          email: userEmail,
        })
      );
      login();
    } else {
      logout();
    }
  }, [login, isLoggedIn]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/ManageCourse/:cid">
          <ManageCourse />
        </Route>
        <Route path="/" exact>
          <UserHome />
        </Route>
        <Route path="/Blogs">
          <Blogs />
        </Route>
        <Route path="/Blog/:bid">
          <ReadBlog />
        </Route>
        <Route path="/Courses" exact>
          <Courses />
        </Route>
        <Route path="/MyCourses" exact>
          <MyCourses />
        </Route>
        <Route path="/CourseDetails/:cid" exact>
          <CourseDetails />
        </Route>
        <Route path="/UserHome" exact>
          <UserHome />
        </Route>
        <Route path="/Lectures/:cid">
          <Lecture />
        </Route>
        <Route path="/Forum">
          <Forum />
        </Route>
        <Route path="/Contact" exact>
          <Contact />
        </Route>
        <Route path="/Instructor" exact>
          <Instructor />
        </Route>
        <Route path="/chat" exact>
          <ChatApp roomid={null}/>
        </Route>
        <Route path="/startChat/:uid" exact>
          <StartChat />
        </Route>
        <Route path="/discussionPage/:name/:email" exact>
          <ChatApp roomid={null}/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (isAdmin) {
    routes = (
      <Switch>
        <Route path="/Admin">
          <Admin />
        </Route>
        <Route path="/Enquiries">
          <Enquiries />
        </Route>
        <Route path="/AddCourse">
          <AddCourse />
        </Route>
        <Route path="/AddBlog">
          <AddBlog />
        </Route>
        <Route path="/AddTechnology">
          <AddTechnology />
        </Route>
        <Route path="/EditCourse" exact>
          <ModifyCourses />
        </Route>
        <Route path="/UpdateCourse/:cid" exact>
          <UpdateCourse />
        </Route>
        <Route path="/AddSyllabus/:cid" exact>
          <AddSyllabus />
        </Route>
        <Route path="/AddVideos/:cid" exact>
          <AddVideos />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/Blogs" exact>
          <Blogs />
        </Route>
        <Route path="/Blog/:bid">
          <ReadBlog />
        </Route>
        <Route path="/Courses" exact>
          <Courses />
        </Route>
        <Route path="/CourseDetails/:cid" exact>
          <CourseDetails />
        </Route>
        <Route path="/Auth" exact>
          <Auth />
        </Route>
        <Route path="/Contact" exact>
          <Contact />
        </Route>
        <Route path="/Register_Demo_Class" exact>
          <DemoClass />
        </Route>
        <Route path="/Become_Instructor" exact>
          <BecomeInstructor />
        </Route>
        <Route path="/chat" exact>
          <ChatApp roomid={null}/>
        </Route>
        <Route path="/discussionPage/:name/:email" exact>
          <ChatApp roomid={null}/>
        </Route>
        <Route path="/Admin">
          <Admin />
        </Route>
        <Redirect to="/Auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isInstructor: isInstructor,
        email: userEmail,
        userid: userId,
        login: login,
        logout: logout,
      }}
    >
      <AdminContext.Provider
        value={{ isLoggedIn: isAdmin, login: loginAdmin, logout: logoutAdmin }}
      >
        <Router>
          <Navbar />
          {isLoggedIn && <UserNav />}
          {routes}
          <Footer />
        </Router>
      </AdminContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
