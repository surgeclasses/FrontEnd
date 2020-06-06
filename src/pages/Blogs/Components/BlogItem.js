import React from "react";
import { useHistory } from "react-router-dom";

import BlogItemCard from "./BlogItemCard";

import "./BlogItem.css";

const BlogItem = (props) => {
  const history = useHistory();
  const blogId = props.id;
  console.log(props);
  const itemClickListener = () => {
    // history.push({ pathname: "/CourseDetails", state: props });
    history.push('/Blog/'+blogId);
  };

  return (
    <li className="blog-item"  onClick={itemClickListener}>
      <BlogItemCard>
        <h3 className="blog-title">{props.title}</h3>
        <span className="blog-technology">{props.technology}</span>
        <span className="blog-date">{props.date}</span>
        <hr/>
        <p className="blog-metadata">{props.metadata}...</p>
      </BlogItemCard>
    </li>
  );
};

export default BlogItem;
