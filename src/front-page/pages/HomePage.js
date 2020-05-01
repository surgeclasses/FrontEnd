import React from "react";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="body">
      <h1 id="top">Home Page</h1>
      <section id="about">
        <div>
          <p>
            About section of the page
          </p>
        </div>
      </section>
      <section id="contact">
        <div>
          <p>
            Contact section of the page
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
