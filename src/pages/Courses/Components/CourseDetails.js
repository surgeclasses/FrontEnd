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

  
  const ListItem = ({ value }) => <li>{value}</li>;

  const List = ({ items }) => (
    <ul className="module-list">
      {items.map((item, i) => (
        <ListItem key={i} value={item} />
      ))}
    </ul>
  );

  const FullListItem = ({ module }) => {
    if (!!module) {
      return (
        <li>
          <h2>{module.title}</h2>
          <List items={module.topics} />
        </li>
      );
    } else {
      return "";
    }
  };

  const FullList = ({ items }) => {
    if (items.length > 0) {
      return (
        <ul className="syllabus-list">
          {items.map((item, i) => (
            <FullListItem key={i} module={item} />
          ))}
        </ul>
      );
    } else {
      return "";
    }
  };

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
          <div className="course-overview">
              <h2>Course Contents</h2>
            {loadedCourse.syllabus && <FullList items={loadedCourse.syllabus} />}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CourseDetails;
