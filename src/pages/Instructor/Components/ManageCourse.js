import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { CSSTransition } from "react-transition-group";

import "./ManageCourse.css";
import "react-datepicker/dist/react-datepicker.css";
import { useHttpClient } from "../../../hooks/http-hook";
import LoadingSpinner from "../../../components/LoadingSpinner";
import checkIcon from "../../../assets/check-icon.png";
import VideoUpload from "./VideoUpload";
import FileUpload from "./FileUpload";

const Lecture = () => {
  const { cid } = useParams();
  let classes = {};
  const [loadedCourse, setLoadedCourse] = useState();
  const [loadedBatch, setLoadedBatch] = useState();
  const [chosenIndex, setChosenIndex] = useState();
  const [batchName, setBatchName] = useState();
  const [startDate, setStartDate] = useState();
  const [nextClassDate, setNextClassDate] = useState();
  const [classLink, setClassLink] = useState();
  const [coveredTopics, setCoveredTopics] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [filesPath, setFilesPath] = useState("");
  const [currentStage, setCurrentStage] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchBatch = async (batchId) => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/batch/" + batchId
        );
        setLoadedBatch(responseData);
        classes = { ...responseData.classes.classes };
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        if (!isLoading) {
          setLoadedCourse(responseData);
          if (!responseData.batch) {
            setCurrentStage(-1);
          } else {
            fetchBatch(responseData.batch);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourse();
  }, []);

  const ListItem = ({ value, index }) => {
    const [isClicked, setIsClicked] = useState(false);
    const clickHandler = () => {
      setCoveredTopics([...coveredTopics, value]);
      setIsClicked(true);
    };
    return (
      <li onClick={clickHandler} className="topics-item">
        {value}
        {isClicked && <img src={checkIcon} />}
      </li>
    );
  };

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
          <ListItem key={i} value={item} index={i} />
        ))}
      </ul>
    </CSSTransition>
  );

  const FullListItem = ({ module }) => {
    const [isListOpen, setIsListOpen] = useState(false);

    if (!!module) {
      return (
        <li className="module-block">
          <h3 className="module-title" onClick={setIsListOpen(!isListOpen)}>
            {module.title}
          </h3>
          <List show={isListOpen} items={module.topics} />
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

  const uploadClassFiles = async (pickedFile) => {
    let formData = new FormData();
    formData.append("classdocs", pickedFile);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/uploadfiles`,
        "POST",
        formData
      );
      setFilesPath(response.path);
      setCurrentStage(6);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadClassVideo = async (videoFile) => {
    let formData = new FormData();
    formData.append("classvideo", videoFile);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/uploadvideo`,
        "POST",
        formData
      );
      setVideoUrl(response.path);
      setCurrentStage(5);
    } catch (err) {
      console.log(err);
    }
  };

  const classClickHandler = (index) => {
    setChosenIndex(index);
    setCurrentStage(0);
  };

  const ClassList = ({ classes }) => {
    if (classes.length > 0) {
      return (
        <ul className="class-list">
          {classes.map((item, i) => (
            <li
              className="class-list-block"
              onClick={() => classClickHandler(i)}
            >
              <h3 className="class-title">{item.title}</h3>
              <sub className="class-date">{item.date}</sub>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const addNewBatch = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/addbatch/${cid}`,
        "PATCH",
        JSON.stringify({
          name: batchName,
          startDate: startDate,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setLoadedCourse(responseData);

      const responseBatch = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          "/courses/batch/" +
          responseData.batch
      );
      setLoadedBatch(responseBatch);
    } catch (err) {
      console.log(err);
    }
    setCurrentStage(0);
  };

  const submitMeetLink = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/addmeeturl/${loadedCourse.batch}`,
        "PATCH",
        JSON.stringify({
          meetUrl: classLink,
          classIndex: chosenIndex,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
    setCurrentStage(2);
  };

  const markEndClass = async () => {
    let modifiedClasses = loadedBatch.classes.classes;
    let currentClass = modifiedClasses[chosenIndex];
    currentClass.isRunning = false;
    currentClass.isComplete = true;
    currentClass.topicsCovered = coveredTopics;
    currentClass.videoUrl = videoUrl;
    currentClass.filesPath = filesPath;

    const title = `Class  + ${chosenIndex + 2}`;

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/updateclasses/${loadedCourse.batch}`,
        "PATCH",
        JSON.stringify({
          currentClass: currentClass,
          classIndex: chosenIndex,
          title: title,
          date: nextClassDate,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setLoadedBatch(responseData);
      classes = responseData.classes.classes;
      setCurrentStage(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
      {isLoading && <LoadingSpinner />}
      {loadedCourse && (
        <div className="manage-section">
          <h2>Manage Course</h2>
          <div className="class-list-section">
            {loadedBatch && <ClassList classes={loadedBatch.classes.classes} />}
          </div>
          <div className="class-stages-section">
            {currentStage == -1 && (
              <div>
                <input
                  className="form-control"
                  placeholder="New Batch Name"
                  onChange={(event) => {
                    setBatchName(event.target.value);
                  }}
                />
                <br />
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                />
                <br />
                <button onClick={addNewBatch} className="button">
                  New Batch
                </button>
              </div>
            )}
            {currentStage == 0 && (
              <button
                onClick={() => {
                  setCurrentStage(1);
                }}
                className="button"
              >
                Start Class
              </button>
            )}
            {currentStage == 1 && (
              <div>
                <input
                  className="form-control"
                  placeholder="Paste Meet Link Here..."
                  onChange={(event) => {
                    setClassLink(event.target.value);
                  }}
                />
                <br />
                <button onClick={submitMeetLink} className="button">
                  Submit
                </button>
              </div>
            )}
            {currentStage == 2 && (
              <button
                onClick={() => {
                  setCurrentStage(3);
                }}
                className="button"
              >
                End Class
              </button>
            )}
            {currentStage == 3 && (
              <div>
                <h4>Choose Topics Covered Today</h4>
                {loadedCourse.syllabus && (
                  <FullList items={loadedCourse.syllabus} />
                )}
                <button
                  className="button center"
                  onClick={() => {
                    setCurrentStage(4);
                  }}
                >
                  Submit
                </button>
              </div>
            )}
            {currentStage == 4 && (
              <VideoUpload fileUploadHandler={uploadClassVideo} />
            )}
            {currentStage == 5 && (
              <FileUpload fileUploadHandler={uploadClassFiles} />
            )}
            {currentStage == 6 && (
              <div>
                <DatePicker
                  className="form-control"
                  selected={nextClassDate}
                  onChange={(date) => {
                    setNextClassDate(date);
                  }}
                />
                <br />
                <button onClick={markEndClass} className="button">
                  Add Next Class
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecture;
