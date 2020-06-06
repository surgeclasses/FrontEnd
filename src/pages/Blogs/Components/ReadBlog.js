import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ReadBlog.css";
import { useHttpClient } from "../../../hooks/http-hook";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Modal from "../../../components/Modal";
import Technologies from "./Technologies";
import Card from "../../../components/Card";

const ReadBlog = () => {
  const [loadedBlog, setLoadedBlog] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let { bid } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/blogs/" + bid
        );
        if (!isLoading) {
          setLoadedBlog(responseData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, []);

  const searchHandler = () => {};

  return (
    <div className="body">
      <input
        className="search-input"
        id="search-query"
        type="text"
        placeholder="Search"
        onT={searchHandler}
      />

      <br />
      <Modal error={error} onClear={clearError} />
      <div className="categories-container">
        <Technologies />
      </div>
      <Card className="full-blog-container">
        {isLoading && <LoadingSpinner />}
        {loadedBlog && (
          <div>
            <h1>{loadedBlog.title}</h1>
            <h3>{loadedBlog.technology}</h3>
            <h4 className="right">{loadedBlog.date}</h4>
            <hr />
            <br/>
            <p>{loadedBlog.content}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReadBlog;
