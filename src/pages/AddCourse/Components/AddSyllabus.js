import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./AddSyllabus.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Button from "../../../components/Button";
import plusIcon from "../../../assets/plus-icon.png";

const AddSyllabus = () => {
  const [loadedCourse, setLoadedCourse] = useState();
  const [topic, setTopic] = useState();
  const [title, setTitle] = useState();
  const [module, setModule] = useState({
    title: "",
    topics: [],
  });
  const [syllabus, setSyllabus] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let { cid } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        setLoadedCourse(responseData);
        console.log(responseData);
        console.log(loadedCourse);
        if (!!responseData.syllabus) setSyllabus(responseData.syllabus);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, []);

  const history = useHistory();

  const submitHandler = async (event) => {
    
      let newSyllabus = [
        ...syllabus,
        { title: module.title, topics: [...module.topics] },
      ];
      setSyllabus(newSyllabus);
      setModule({
        title: "",
        topics: [],
      });
    
    try {
      let updatedCourse = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/syllabus/${cid}`,
        "PATCH",
        JSON.stringify({
          syllabus: newSyllabus,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log("Updated Course:\n");
      console.log(updatedCourse);
      history.push("/AddSyllabus/" + cid);
    } catch (err) {
      console.log(err);
    }
  };

  const addModuleHandler = () => {
    if (title != "") {
      if (module.title != "") {
        let newSyllabus = [
          ...syllabus,
          { title: module.title, topics: [...module.topics] },
        ];
        setSyllabus(newSyllabus);
      }
      let newModule = { ...module };
      newModule.title = title;
      newModule.topics = [];
      setModule(newModule);
    }
  };

  const addTopicHandler = () => {
    if (topic != "") {
      let newTopics = [...module.topics, topic];
      setModule({ title: module.title, topics: newTopics });
      console.log(module);
      console.log(syllabus);
    }
  };

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
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className="syllabus-form-container">
          <div id="syllabus-container">
            {syllabus && <FullList items={syllabus} />}
            {module && (
              <div>
                <h2>{module.title}</h2>
                <List items={module.topics} />
              </div>
            )}
          </div>
          <div className="module-input-container">
            <input
              id="module-title"
              type="text"
              className="topics-input title"
              placeholder="Module Title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <img
              className="plus-icon"
              src={plusIcon}
              onClick={addModuleHandler}
            />
          </div>
          <div className="topics-input-container">
            <input
              id="topic"
              element="input"
              placeholder="Topic"
              className="topics-input topic"
              onChange={(event) => setTopic(event.target.value)}
            />
            <img
              className="plus-icon"
              src={plusIcon}
              onClick={addTopicHandler}
            />
          </div>
          <br />
          <Button onClick={submitHandler}>Done</Button>
        </div>
      )}
    </div>
  );
};

export default AddSyllabus;
