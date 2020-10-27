import React from "react";

import "../../Courses/Components/CourseList.css";
import TestimonialItem from "./TestimonialItem";

const TestimonialList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Items Found</h2>
      </div>
    );
  }
  return (
    <ul className="course-list">
      {props.items.map((item) => {
        return (
          <TestimonialItem
            key={item.id}
            id={item.id}
            name={item.name}
            review={item.review}
            imgUrl={item.imgUrl}
          />
        );
      })}
    </ul>
  );
};

export default TestimonialList;
