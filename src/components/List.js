import React from "react";

import "./List.css";
import ListItem from "./ListItem";

const List = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Items Found</h2>
      </div>
    );
  }
  return (
    <ul className="list">
      {props.items.map((item) => {
        return (
          <ListItem
            key={item.id}
            id={item.id}
            content={item.title}
          />
        );
      })}
    </ul>
  );
};

export default List;