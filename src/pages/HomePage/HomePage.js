import React from "react";

import "./HomePage.css";
import Intro from "./Components/Intro";
import About from "./Components/About";
import TopCourses from "./Components/TopCourses";
import HotTechnologies from "./Components/HotTechnologies";
import Testimonials from "./Components/Testimonials";

const HomePage = () => {
  return (
    <div className="body">
      <Intro />
      <TopCourses />
      <section id="about">
        <About />
      </section>
      <div className="technologies-section">
        <HotTechnologies />
      </div>
      <Testimonials />
      {/* <section id="contact">
        <div>
          <p>
            Contact section of the page
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
