import React from "react";

import imageUrl from '../../../assets/dummy_banner.jpg'

const About = () => {
  return (
    <div className="about-section">
      <h3 className="section-title">About Us</h3>
      <img className="about-image" src={imageUrl} alt="About Us"/>
      <p className="about-text">About section here About section here About section here About section here About section here 
      About section here About section here About section here About section here About section here 
      About section here About section here About section here About section here About section here 
      About section here About section here About section here About section here About section here </p>
    </div>
  );
};

export default About;
