import React from "react";

import imageUrl from '../../../assets/about_img.jpg'

const About = () => {
  return (
    <div className="about-section">
      <h3 className="section-title">About Us</h3>
      <img className="about-image" src={imageUrl} alt="About Us"/>
      <p className="about-text">We here at Surge Classes work together to break the situation of
       the education market and help students learn latest market technologies from the best of
        instructors with a background of Top Institutes of the Country along with years of work experience
        in the technology industry. We designed the most effective course structure that works on every
        single student that joins and it not only makes our students learn the core concepts clearly but
        also give them a great understanding of the practical implementation of it by providing great
        projects to work on along with the training followed by Internship Programs in Research and
        Development in hot technologies like Machine Learning and Artificial Intelligence. </p>
    </div>
  );
};

export default About;
