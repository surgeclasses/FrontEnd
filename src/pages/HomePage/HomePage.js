import React from "react";

import "./HomePage.css";
import Intro from "./Components/Intro";
import About from "./Components/About";
import TopCourses from "./Components/TopCourses";
import HotTechnologies from "./Components/HotTechnologies";
import Testimonials from "./Components/Testimonials";
import Features from "./Components/Features";
import Contact from "../Contact/Contact"
import CourseSlider from "./Components/CourseSlider";
import AboutPart from "./Components/AboutPart";

const HomePage = () => {
  return (
    <div className="body">
    <div className="flex-homePage">
    <div className="flex-homeItem homeItem-1">
      <Intro />
    </div>

    <div className="flex-homeItem homeItem-2">
    <div className="gradient-overlay">
      <TopCourses />
      {/* <CourseSlider /> */}
      </div>
    </div>

    <div className="flex-homeItem homeItem-3">
    <section id="about">
      <Features/>
      {/* <div className="wave"> ‎‎‎‎‎‎ </div> */}
      <AboutPart/>
      {/* <About /> */}
      </section>
    </div>

    <div className="flex-homeItem homeItem-4">
    <Contact />
    </div>

    <div>
      {/*<div className="block-overlay">
      <br/>
  </div> */}
      
      
      
      {/* <div className="technologies-section">
        <HotTechnologies />
      </div> */}
      {/* <Testimonials /> */}
    </div>
      
      
      
      
    </div>
    </div>
  );
};

export default HomePage;
