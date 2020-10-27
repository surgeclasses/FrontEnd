import React from "react";
import TestimonialList from "./TestimonialList";

const testimonialList = [
  {
    id: "t1",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://dummyimage.com/300.png/09f/fff",
  },
  {
    id: "t2",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://dummyimage.com/300.png/09f/fff",
  },
  {
    id: "t3",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://dummyimage.com/300.png/09f/fff",
  },
  {
    id: "t4",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://dummyimage.com/300.png/09f/fff",
  },
  {
    id: "t5",
    name: "Some Name",
    review: "Some content here for the review from the above named user.",
    imgUrl: "https://dummyimage.com/300.png/09f/fff",
  }
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
