import React, { useState, useEffect } from "react";

import "./RecordedLecture.css";
import { useHttpClient } from "../../../hooks/http-hook";

const LiveLecture = (props) => {
  const cid = props.course._id;
  const [loadedCourse, setLoadedCourse] = useState(props.course);

  const ListItem = ({ value }) => <li className="topics-item">{value}</li>;

  const List = ({ items }) => (
    <ul className="topics-list">
      {items.map((item, i) => (
        <ListItem key={i} value={item} />
      ))}
    </ul>
  );

  const FullListItem = ({ module }) => {
    if (!!module) {
      return (
        <li className="module-block">
          <h2 className="module-title">{module.title}</h2>
          <List items={module.topics} />
        </li>
      );
    }
    return null;
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
    }
    return null;
  };

  return (
    <div className="body">
      {props.course && (
        <div>
          <div className="video-section">
            <div className="video-player"></div>
            <h3 className="video-title">Title and Description of Video</h3>
          </div>
          <div className="course-playlist">
            <h3>Course Contents</h3>
            {props.course.syllabus && (
              <FullList items={props.course.syllabus} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveLecture;
