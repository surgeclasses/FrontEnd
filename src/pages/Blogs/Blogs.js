import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Blogs.css";
import { useHttpClient } from "../../hooks/http-hook";
import BlogList from "./Components/BlogList";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import Technologies from "./Components/Technologies";
import Input from "../../components/Input";

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

  const history = useHistory();
  const buttonClickHandler = () => {
    history.push("/AddBlog");
  };

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
      <button
        className="button button-default button-right"
        onClick={buttonClickHandler}
      >
        Add Blog
      </button>
        <br />
      <Modal error={error} onClear={clearError} />
      <div className="categories-container">
        <Technologies />
      </div>
      <div className="bloglist-container">
        {isLoading && <LoadingSpinner />}
        {loadedBlogs && <BlogList items={loadedBlogs} />}
      </div>
    </div>
  );
};

export default Blogs;
