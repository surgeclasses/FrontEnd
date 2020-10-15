import React from "react";

import "./HomePage.css";
import Intro from "./Components/Intro";
import About from "./Components/About";
import TopCourses from "./Components/TopCourses";
import HotTechnologies from "./Components/HotTechnologies";
import Testimonials from "./Components/Testimonials";
import Features from "./Components/Features";
import Contact from "../Contact/Contact"

const HomePage = () => {
  return (
    <div className="body">
      <Intro />
      {/* <Features/> */}
      {/* <TopCourses /> */}
      <section id="about">
        <About />
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
