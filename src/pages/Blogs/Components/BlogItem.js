import React from "react";

import BlogItemCard from "./BlogItemCard";

import "./BlogItem.css";

const BlogItem = (props) => {
  return (
    <li className="blog-item">
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
