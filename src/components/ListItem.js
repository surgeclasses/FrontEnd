import React from "react";

import Card from "./Card";

import "./ListItem.css";

const ListItem = (props) => {
  return (
    <li className="item">
      <div className="list-card">
        <p>{props.content}</p>
      </div>
    </li>
  );
};

export default ListItem;