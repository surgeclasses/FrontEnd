import React from "react";
import "./AboutPart.css";

const AboutPart = () => {
  return (
    <div className="about-img">
    <div className="about-WeAre">
              We Are
              </div>
              <div className="about-yourneed">
              Surge..
      </div>
      {/* <div className="about-WeAre">About Us:</div>  */}
      <div className="about-surgeBox">
        <span class="dot"></span>
        <div className="about-surgeText">
          We here at Surge Classes work together to break the situation of the
          education market and help students learn latest market technologies
          from the best of instructors with a background of Top Institutes of
          the Country along with years of work experience in the technology
          industry. We designed the most effective course structure that works
          on every single student that joins .
        </div>
      </div>
    </div>
  );
};

export default AboutPart;
