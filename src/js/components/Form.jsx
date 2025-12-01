import React, { useState } from "react";

const Form = ({ onAddTask }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === "") return;

    onAddTask(input);
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Escribe una tarea y pulsa Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
    </form>
  );
};

export default Form;
