import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import "./Navlinks";
import "./Navbar.css";
import Navlinks from "./Navlinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import CoursesNavBar from './CoursesNavBar';
import Logo from "../assets/logo.png";
import Button from "./Button";
import {useHttpClient} from '../hooks/http-hook';


const Navbar = (props) => {

  const history = useHistory();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const location = useLocation();
  // console.log(location.pathname);

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
