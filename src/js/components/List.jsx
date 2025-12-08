import React from "react";
import Item from "./Item.jsx";

const List = ({ tasks, onDeleteTask }) => {
  return (
    <ul>
      {tasks.length === 0 && (
        <li className="vacio">No hay nada, añadir tareas</li>
      )}

      {tasks.map((t) => (
        <Item
          key={t.id}
          text={t.label}
          onDelete={() => onDeleteTask(t.id)}
        />
      ))}
    </ul>
  );
};

export default List;
