import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useHttpClient } from "../../../hooks/http-hook";

import "./AddVideos.css";
import VideoUpload from "../../Instructor/Components/VideoUpload";

const AddVideos = () => {
  const { cid } = useParams();
  const [loadedCourse, setLoadedCourse] = useState();
  const [syllabus, setSyllabus] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        setLoadedCourse(responseData);
        if (!!responseData.syllabus) setSyllabus(responseData.syllabus);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, []);

  const addVideoHandler = async (pickedFile, titleIndex, topicIndex) => {
    let formData = new FormData();
    //Add other formData for courseId, etc.
    //Change syllabus object to accomodate lectureId
    formData.append("lecture", pickedFile);
    formData.append("courseId", cid);
    formData.append("titleIndex", titleIndex);
    formData.append("topicIndex", topicIndex);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/uploadlecture`,
        "POST",
        formData
      );

      console.log(response);
      setLoadedCourse(response.course);
      // setVideoUrl(response.course.videoList);
    } catch (err) {
      console.log(err);
    }
  };

  const ListItem = ({ parentId, id, value }) => (
    <li className="topic-item" key={id}>
      <div className="topic-title">{value.topic}</div>
      {!value.lecture && <VideoUpload topicIndex={id} titleIndex={parentId} fileUploadHandler={addVideoHandler} />}
      {value.lecture && <h3>Video Available</h3>}
    </li>
  );

  const List = ({ id, items, show }) => (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <ul className="module-list">
        {items.map((item, i) => (
          <ListItem parentId={id} id={i} value={item} />
        ))}
      </ul>
    </CSSTransition>
  );

  const FullListItem = ({ id, module }) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const openList = () => {
      setIsListOpen(!isListOpen);
    };
    if (!!module) {
      return (
        <li>
          <br />
          <h3 onClick={openList}>{module.title}</h3>
          {<List show={isListOpen} id={id} items={module.topics} />}
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
            <FullListItem key={i} id={i} module={item} />
          ))}
        </ul>
      );
    } else {
      return "";
    }
  };

  if (!syllabus) {
    return (
      <div className="body">
        <h2>Add Syllabus First</h2>
      </div>
    );
  }

  return (
    <div className="body">
      <Modal error={error} clearError={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="course-overview">
        <h2>Add Videos for Topics</h2>
        {syllabus && <FullList items={syllabus} />}
      </div>
    </div>
  );
};

export default AddVideos;
