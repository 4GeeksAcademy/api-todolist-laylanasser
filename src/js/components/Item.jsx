import React from "react";

const Item = ({ text, onDelete }) => {
  return (
    <li className="todo-item">
      <span>{text}</span>
      <button className="delete-btn" onClick={onDelete}>
        x
      </button>
    </li>
  );
};

export default Item;
