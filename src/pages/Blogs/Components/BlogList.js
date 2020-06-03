import React from 'react';

import './BlogList.css';
import BlogItem from './BlogItem';

const BlogList = (props) => {
    if (props.items.length === 0) {
      return (
        <div className="center">
          <h2>No Blogs Found</h2>
        </div>
      );
    }
    return (
      <ul className="blog-list">
        {props.items.map((blog) => {
  
          return (
            <BlogItem
              key={blog.id}
              id={blog.id}
              title={blog.title}
              keywords={blog.keywords}
              content={blog.content}
              metadata={blog.metadata}
              date={blog.date}
            />
          );
        })}
      </ul>
    );
  };
  
  export default BlogList;
  

