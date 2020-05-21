import React from "react";
import TestimonialList from "./TestimonialList";

const testimonialList = [
  {
    id: "t1",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://picsum.photos/id/237/200/300",
  },
  {
    id: "t1",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://picsum.photos/id/237/200/300",
  },
  {
    id: "t1",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://picsum.photos/id/237/200/300",
  },
  {
    id: "t1",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://picsum.photos/id/237/200/300",
  },
  {
    id: "t1",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://picsum.photos/id/237/200/300",
  },
  {
    id: "t1",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://picsum.photos/id/237/200/300",
  },
];

const Testimonials = () => {
  return (
    <div className="card">
      <h3 className="section-title">Testimonials</h3>
      <div className="horizontal-scroll">
        {testimonialList && <TestimonialList items={testimonialList} />}
      </div>
    </div>
  );
};

export default Testimonials;
