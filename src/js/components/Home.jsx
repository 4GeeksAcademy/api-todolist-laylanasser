import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";
import List from "./List.jsx";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const userName = "laylanasser";
  const urlBase = "https://playground.4geeks.com/todo";

  // Cargar tareas desde el servidor
  const loadTodos = () => {
    fetch(`${urlBase}/users/${userName}`)
      .then(resp => resp.json())
      .then(data => {
        setTasks(data.todos || []);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Al iniciar: crear usuario y luego cargar tareas
  useEffect(() => {
    fetch(`${urlBase}/users/${userName}`, {
      method: "POST"
    })
      .then(() => {
        loadTodos();
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Añadir tarea
  const addTask = (text) => {
    if (text === "") return;

    const newTask = {
      label: text,
      is_done: false
    };

    fetch(`${urlBase}/todos/${userName}`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(() => {
        loadTodos();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Borrar una tarea
  const deleteTask = (id) => {
    fetch(`${urlBase}/todos/${id}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(() => {
        loadTodos();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Borrar todas las tareas
  const clearAll = () => {
    fetch(`${urlBase}/users/${userName}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(() => {
        return fetch(`${urlBase}/users/${userName}`, {
          method: "POST"
        });
      })
      .then(() => {
        loadTodos();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="todo-app">
      <h1>Lista To Do Layla</h1>
      <Form onAddTask={addTask} />
      <List tasks={tasks} onDeleteTask={deleteTask} />
      <p>{tasks.length} tareas pendientes</p>
      <button className="clear-btn" onClick={clearAll}>
        Borrar todas las tareas
      </button>
    </div>
  );
};

export default Home;
