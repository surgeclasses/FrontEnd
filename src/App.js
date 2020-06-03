import React, { useState, useCallback } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import UserHome from "./pages/UserHome/UserHome";
import Courses from "./pages/Courses/Courses";
import Blogs from "./pages/Blogs/Blogs";
import Auth from "./pages/Auth/Auth";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContext } from "./context/auth-context";
import Lecture from "./pages/Lecture/Lecture";
import Forum from "./pages/Forum/Forum";
import AddCourse from "./pages/AddCourse/AddCourse";
import AddBlog from "./pages/AddBlog/AddBlog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  });

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  });

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <UserHome />
        </Route>
        <Route path="/Blogs" >
          <Blogs />
        </Route>
        <Route path="/Courses" exact>
          <Courses />
        </Route>
        <Route path="/UserHome" exact>
          <UserHome />
        </Route>
        <Route path="/Lecture" >
          <Lecture />
        </Route>
        <Route path="/Forum" >
          <Forum />
        </Route>
        <Route path="/AddCourse">
          <AddCourse/>
        </Route>
        <Route path="/AddBlog">
          <AddBlog/>
        </Route>
        <Route path="/Contact" exact>
          <Contact />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/Blogs" >
          <Blogs />
        </Route>
        <Route path="/Courses" exact>
          <Courses />
        </Route>
        <Route path="/Auth" exact>
          <Auth />
        </Route>
        <Route path="/Contact" exact>
          <Contact />
        </Route>
        <Route path="/AddCourse">
          <AddCourse/>
        </Route>
        <Route path="/AddBlog">
          <AddBlog/>
        </Route>
        <Redirect to="/Auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Navbar />
        {routes}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
