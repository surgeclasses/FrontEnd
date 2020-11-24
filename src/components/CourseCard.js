import React from 'react';

import './CourseCard.css';

const CourseCard = props => {
  return (
    <div className={`cardd ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default CourseCard;
