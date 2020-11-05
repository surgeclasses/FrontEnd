import React, { useState, useEffect } from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./intro.css";
import ReactHtmlParser from "react-html-parser";
import Card from "../../../components/Card";
import tagImg from "../../../assets/live-tag.png";
import "./CourseSlider.css";

import { useHttpClient } from "../../../hooks/http-hook";

const CourseSlider = () => {
  const [loadedCourses, setLoadedCourses] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses"
        );
        console.log("in response data", responseData);
        setLoadedCourses(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <div>
      <div>
        {loadedCourses && (
          <Slider className="slider-wrapper">
            {loadedCourses.map((item, index) => (
              <div
                key={index}
                className="slider-content"
                style={{ width: "100%", height: "20rem" }}
              >
                <div className="inner course-item">
                  <Card className="course-card">
                    {item.isLive && <img className="live-tag" src={tagImg} />}
                    <h4>{item.title}</h4>
                    <p>{ReactHtmlParser(item.description)}</p>
                    <span>₹{item.fee}</span>
                  </Card>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default CourseSlider;
