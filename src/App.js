import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import HomePage from './front-page/pages/HomePage'
import Courses from './front-page/pages/Courses'
import Blogs from './front-page/pages/Blogs'
import Auth from './front-page/pages/Auth'
import Navbar from './front-page/components/Navbar'

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
    <Redirect to="/"/>
    </Switch>
  </Router>
  );
}

export default App;
