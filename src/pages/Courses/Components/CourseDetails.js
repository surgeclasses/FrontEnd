import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

import "./CourseDetails.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Modal from "../../../components/Modal";
import Card from "../../../components/Card";
import LoadingSpinner from "../../../components/LoadingSpinner";

const CourseDetails = () => {
  const [loadedCourse, setLoadedCourse] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let { cid } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        setLoadedCourse(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, []);

  return (
    <div className="body">
      <Modal error={error} clearError={clearError} />
      { isLoading && <LoadingSpinner /> }
      {loadedCourse && (
        <Fragment>
          <div className="course-head">
            <div className="course-intro">
              <h1>{loadedCourse.title}</h1>
              <h2>{loadedCourse.description}</h2>
              <div className="course-highlights">
                <h3>Instructor: {loadedCourse.instructor}</h3>
                <h3>{loadedCourse.avgRating}/5</h3>
                <h3>{loadedCourse.duration} Hours</h3>
                <h3>Course Starts: {loadedCourse.startDate}</h3>
              </div>
            </div>
            <Card className="purchase-card">
              <h2>Fee: ₹{loadedCourse.fee}</h2>
              <button className="button button-default">Apply</button>
            </Card>
          </div>
          <div>
            <p className="course-overview">
              {loadedCourse.overview}
              <h2>Program Overview<br/>Key Highlights</h2>
              Designed for Working Professionals<br/>
              500+ Hours of Learning 12+<br/>
              Projects and Assignments <br/>
              Fortnightly Group Mentorship with
              Industry Mentors <br/>
              One-on-One with Industry Mentors <br/>
              3 Guaranteed Job
              Interviews <br/>
              Dedicated Student Success Mentor <br/>
              IIIT Bangalore & LJMU
              Alumni Status <br/>
              Global Access to job opportunities <br/>
              Job Placement
              Assistance with Top Firm
            </p>
          </div>
          {/* {loadedCourse.topics.map((topic) => {
              return (<Card><p>{topic}</p></Card>);
          })} */}
        </Fragment>
      )}
    </div>
  );
};

export default CourseDetails;
