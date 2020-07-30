import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import "./LiveLecture.css";
import LiveVideo from "./LiveVideo";
import Chat from "./Chat";
import Button from "../../../components//Button";

const DUMMY_CLASSES = [
  {
    title: "Class 1",
    date: "15-July-2020",
    isComplete: true,
    isRunning: false,
    meetUrl: "urlForMeet",
    topicsCovered: ["Some topic", "Some other topic", "Another topic"],
    videoUrl: "someUrlOfVideoHere",
    filesPath: "urlForFilesAndResources",
  },
  {
    title: "Class 2",
    date: "17-July-2020",
    isComplete: true,
    isRunning: false,
    meetUrl: "urlForMeet",
    topicsCovered: ["Some topic", "Some other topic", "Another topic"],
    videoUrl: "someUrlOfVideoHere",
    filesPath: "urlForFilesAndResources",
  },
  {
    title: "Class 3",
    date: "19-July-2020",
    isComplete: true,
    isRunning: false,
    meetUrl: "urlForMeet",
    topicsCovered: ["Some topic", "Some other topic", "Another topic"],
    videoUrl: "someUrlOfVideoHere",
    filesPath: "urlForFilesAndResources",
  },
  {
    title: "Class 4",
    date: "21-July-2020",
    isComplete: false,
    isRunning: true,
    meetUrl: "https://meet.google.com/xwb-znxk-foy",
    topicsCovered: ["Some topic", "Some other topic", "Another topic"],
    videoUrl: "someUrlOfVideoHere",
    filesPath: "urlForFilesAndResources",
  },
];

const LiveLecture = (props) => {
  // const cid = props.course._id;
  const [loadedCourse, setLoadedCourse] = useState(props.course);
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  useEffect(() => {
    const findCurrentItem = async () => {
      DUMMY_CLASSES.forEach((item, i) => {
        if (!item.isComplete) {
          setCurrentItem(item);
          setIsComplete(item.isComplete);
          setIsRunning(item.isRunning);
          setIsPending(!item.isRunning);
          return;
        }
      });
    };
    findCurrentItem();
  }, []);

  const openClass = (item) => {
    console.log(item);
    setCurrentItem(item);
    setIsComplete(item.isComplete);
    setIsRunning(item.isRunning);
    if (item.isComplete) setIsPending(false);
    else setIsPending(!item.isRunning);
  };

  const goToMeeting= () => {
    window.open(currentItem.meetUrl, '_blank');
  }

  const ListItem = ({ value }) => <li className="topics-item">{value}</li>;

  const List = ({ items, show }) => (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <ul className="topics-list">
        {items.map((item, i) => (
          <ListItem key={i} value={item} />
        ))}
      </ul>
    </CSSTransition>
  );

  const FullListItem = ({ module }) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const openList = (event) => {
      setIsListOpen(!isListOpen);
    };
    if (!!module) {
      return (
        <li className="module-block">
          <h3 className="module-title" onClick={openList}>
            {module.title}
          </h3>
          {<List show={isListOpen} items={module.topics} />}
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

  const ClassList = ({ classes }) => {
    if (classes.length > 0) {
      return (
        <ul className="class-list">
          {classes.map((item, i) => (
            <li className="class-list-block" onClick={() => openClass(item)}>
              <h3 className="class-title">{item.title}</h3>
              <sub className="class-date">{item.date}</sub>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div>
      {loadedCourse && loadedCourse.isLive && (
        <div>
          <div className="session-container">
            {DUMMY_CLASSES && <ClassList classes={DUMMY_CLASSES} />}
            <div className="session-area">
              {isComplete && (
                <div>
                  <h2>Topics Covered</h2>
                  {currentItem.topicsCovered.map((item, i) => (
                    <p className="covered-topics">{item}{", "}</p>
                  ))}
                  <p>{currentItem.date}</p>
                  <Button className="button-default">Watch Video</Button>
                  <Button className="button-default">Download Files</Button>
                </div>
              )}
              {isRunning && (
                <div>
                  <h2>Next Session</h2>
                  <p>{currentItem.date}</p>
                  <Button onClick={goToMeeting} className="button-default">Running...</Button>
                  <br />
                  <sup>Click to Join Class</sup>
                </div>
              )}
              {isPending && (
                <div>
                  <h2>Next Session</h2>
                  <p>{currentItem.date}</p>
                  <Button className="button-default">Waiting</Button>
                </div>
              )}
            </div>
          </div>
          <div className="course-overview">
            <h3>Course Contents</h3>
            {loadedCourse.syllabus && (
              <FullList items={loadedCourse.syllabus} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveLecture;
