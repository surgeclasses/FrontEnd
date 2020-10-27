import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./intro.css"

const content = [
  {
    title: "Surge Classes is here",
    description:
      "The place to learn and gain experience in various technologies",
    // image: "https://i.imgur.com/ZXBtVw7.jpg"
    image: "https://i.imgur.com/DCdBXcq.jpg"
  },
  {
    title: "Data Science specialization",
    description:
      "some description here",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Krishna Swamy Jalla",
    userProfile: "https://i.imgur.com/0Clfnu7.png"
  },
  {
    title: "Full Stack development",
    description:
      "some description here",
    button: "Discover",
    image: "https://i.imgur.com/DvmN8Hx.jpg",
    user: "Priyank Shrivastava",
    userProfile: "https://i.imgur.com/0Clfnu7.png"
  }
];

const Intro = () => {
  return (
    // <div className="top">
    //     <div class="bg-text">
    <div>
        <div>
          {/* <h1>Surge Classes is here</h1> */}
          {/* <h3>
          Surge Classes is here. The place to learn and gain experience in various technologies
          </h3> */}
          <Slider className="slider-wrapper">
            {content.map((item, index) => (
              <div
                key={index}
                className="slider-content"
                // style={{ backgroundImage: `url(${require(${item.image})})`}}>
                style={{ backgroundImage: `url('${item.image}')`,width:'100%', height:'31rem' }} 
                // style={{ background: `url('${item.image}') no-repeat center center` }} 
              >
                <div className="inner">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  {item.button && <button>{item.button}</button>}
                </div>
                <section>
                  {item.user && <img src={item.userProfile} alt={item.user} />}
                  {item.user && <span>
                    Instructor<strong>{item.user}</strong>
                  </span>}
                </section>                
              </div>
            ))}
          </Slider>
        </div>
    </div>
  );
};

export default Intro;
