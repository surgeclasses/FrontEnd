import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage'
import Courses from './pages/Courses/Courses'
import Blogs from './pages/Blogs/Blogs'
import Auth from './pages/Auth/Auth'
import Contact from './pages/Contact/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer';

function App() {
  return (
    <Router>
    <Navbar />
    <Switch>
    <Route path="/" exact>
      <HomePage/>
    </Route>
    <Route path="/Blogs" exact> 
      <Blogs/>
    </Route>
    <Route path="/Courses" exact> 
      <Courses/>
    </Route>
    <Route path="/Auth" exact> 
      <Auth/>
    </Route>
    <Route path="/Contact" exact> 
      <Contact/>
    </Route>
    <Redirect to="/"/>
    </Switch>
    <Footer/>
  </Router>
  );
}

export default App;
