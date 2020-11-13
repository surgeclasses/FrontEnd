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
      <Intro />
      {/* <Features/> */}
      {/*<div className="block-overlay">
      <br/>
  </div> */}
      <div className="gradient-overlay">
      <TopCourses />
      {/* <CourseSlider /> */}
      </div>
      <section id="about">
      <AboutPart/>
      {/*<About /> */}
      </section>
      <Contact />
      {/* <div className="technologies-section">
        <HotTechnologies />
      </div> */}
      {/* <Testimonials /> */}
      
      
    </div>
  );
};

export default HomePage;
