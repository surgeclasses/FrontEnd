import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Blogs.css";
import { useHttpClient } from "../../hooks/http-hook";
import BlogList from "./Components/BlogList";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import Technologies from "./Components/Technologies";
import Card from "../../components/Card";

const Blogs = () => {
  const [loadedBlogs, setLoadedBlogs] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/blogs"
        );
        setLoadedBlogs(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBlogs();
  }, []);

  const searchHandler = () => {};

  return (
    <div className="body page">
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
      <div className="bloglist-container">
        {isLoading && <LoadingSpinner />}
        {loadedBlogs && <BlogList items={loadedBlogs} />}
        {!loadedBlogs && (
          <Card>
            <h3 className="center">Coming Soon...</h3>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Blogs;
