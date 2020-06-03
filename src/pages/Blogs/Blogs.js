import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Blogs.css";
import { useHttpClient } from "../../hooks/http-hook";
import BlogList from "./Components/BlogList";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from '../../components/Modal';

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

  return (
    <div className="body">
      <h2 className="center">Blogs Page</h2>
      
      <Modal error={error} onClear={clearError} />
      <button
        className="button button-default button-right"
        onClick={buttonClickHandler}
      >
        Add Blog
      </button>
      {isLoading && <LoadingSpinner />}
      {loadedBlogs && <BlogList items={loadedBlogs} />}
    </div>
  );
};

export default Blogs;
