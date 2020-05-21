import React from "react";

import Card from "../../../components/Card";

import "./TestimonialItem.css";

const TestimonialItem = (props) => {
  return (
    <li className="item">
      <Card>
        <div className="testimonial-head">
          <img alt="User Image" src={props.imgUrl} />
          <h4>{props.name}</h4>
        </div>
        <p className="testimonial-review">{props.review}</p>
      </Card>
    </li>
  );
};

export default TestimonialItem;
