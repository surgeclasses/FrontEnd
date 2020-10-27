import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Lecture.css";
import { useHttpClient } from "../../hooks/http-hook";
import LiveLecture from "./Component/LiveLecture";
import RecordedLecture from "./Component/RecordedLecture";
import Forum from '../Forum/Forum';

const Lecture = () => {
  const { cid } = useParams();
  const [loadedCourse, setLoadedCourse] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        if (!isLoading) setLoadedCourse(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourse();
  }, []);

  return (
    <div className="body">
      {loadedCourse && loadedCourse.isLive && (
        <LiveLecture course={loadedCourse} />
      )}
      {loadedCourse && !loadedCourse.isLive && (
        <RecordedLecture course={loadedCourse} />
      )}
      <Forum cid={cid} />
    </div>
  );
};

export default Lecture;
