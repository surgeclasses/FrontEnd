import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Player, ControlBar } from "video-react";
import Moment from "react-moment";

import "./LiveLecture.css";
import "../../../../node_modules/video-react/dist/video-react.css";

import { useHttpClient } from "../../../hooks/http-hook";
import LiveVideo from "./LiveVideo";
import Chat from "./Chat";
import Button from "../../../components//Button";

const DUMMY_CLASSES = [
  {
    title: "Loading...",
    date: "",
    isComplete: true,
    isRunning: false,
    meetUrl: "",
    topicsCovered: [""],
    videoUrl: "",
    filesPath: "",
  },
];

// [
//   {
//     title: "Class 1",
//     date: "15-July-2020",
//     isComplete: true,
//     isRunning: false,
//     meetUrl: "urlForMeet",
//     topicsCovered: ["Some topic", "Some other topic", "Another topic"],
//     videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
//     filesPath: "urlForFilesAndResources",
//   },
//   {
//     title: "Class 2",
//     date: "17-July-2020",
//     isComplete: true,
//     isRunning: false,
//     meetUrl: "urlForMeet",
//     topicsCovered: ["Some topic", "Some other topic", "Another topic"],
//     videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
//     filesPath: "urlForFilesAndResources",
//   },
//   {
//     title: "Class 3",
//     date: "19-July-2020",
//     isComplete: true,
//     isRunning: false,
//     meetUrl: "urlForMeet",
//     topicsCovered: ["Some topic", "Some other topic", "Another topic"],
//     videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
//     filesPath: "urlForFilesAndResources",
//   },
//   {
//     title: "Class 4",
//     date: "21-July-2020",
//     isComplete: false,
//     isRunning: true,
//     meetUrl: "https://meet.google.com/xwb-znxk-foy",
//     topicsCovered: ["Some topic", "Some other topic", "Another topic"],
//     videoUrl: "someUrlOfVideoHere",
//     filesPath: "urlForFilesAndResources",
//   },
// ];

const backendUrl = process.env.REACT_APP_ASSET_URL;

const LiveLecture = (props) => {
  // const cid = props.course._id;
  const [loadedCourse, setLoadedCourse] = useState(props.course);
  const [batch, setBatch] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchBatch = async (batchId) => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/batch/" + batchId
        );
        setBatch(responseData);
        DUMMY_CLASSES = { ...responseData.classes.classes };
      } catch (err) {
        console.log(err);
      }
    };
    fetchBatch(loadedCourse.batch);
  }, []);

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

  const goToMeeting = () => {
    window.open(currentItem.meetUrl, "_blank");
  };

  const downloadFiles = () => {
    window.open(backendUrl + "/" + currentItem.filesPath, "_blank");
  };

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
              <Moment className="class-date" format="D MMM YYYY">
                {item.date}
              </Moment>
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
            {batch.classes && <ClassList classes={batch.classes.classes} />}
            <div className="session-area">
              {isComplete && (
                <div>
                  {showVideo && (
                    <div className="video-view">
                      <Player
                        fluid={true}
                        // width={1000} // works only with fluid false
                        // height={650}
                        autoHide
                        src={backendUrl + "/" + currentItem.videoUrl}
                      />
                    </div>
                  )}
                  <h2>Topics Covered</h2>
                  {currentItem.topicsCovered.map((item, i) => (
                    <p className="covered-topics">
                      {item}
                      {", "}
                    </p>
                  ))}
                  <p>
                    <Moment className="class-date" format="D MMM YYYY">
                      {currentItem.date}
                    </Moment>
                  </p>
                  <Button
                    onClick={() => setShowVideo(true)}
                    className="button-default"
                  >
                    Watch Video
                  </Button>
                  <Button onClick={downloadFiles} className="button-default">
                    Download Files
                  </Button>
                </div>
              )}
              {isRunning && (
                <div>
                  <h2>Next Session</h2>
                  <Moment className="class-date" format="D MMM YYYY">
                    {currentItem.date}
                  </Moment>
                  <Button onClick={goToMeeting} className="button-default">
                    Running...
                  </Button>
                  <br />
                  <sup>Click to Join Class</sup>
                </div>
              )}
              {isPending && (
                <div>
                  <h2>Next Session</h2>
                  <Moment className="class-date" format="D MMM YYYY">
                    {currentItem.date}
                  </Moment>
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
