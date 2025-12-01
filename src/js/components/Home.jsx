import React, { useState, useEffect } from "react";
import Form from "./Form.jsx";
import List from "./List.jsx";

const USERNAME = "laylanasser";
const BASE_URL = "https://playground.4geeks.com/todo";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  // 1) Cargar tareas desde la API (o crear el usuario si no existe)
  const fetchTasks = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/users/${USERNAME}`);

      if (resp.ok) {
        const data = await resp.json();
        setTasks(data.todos || []);
        return;
      }

      if (resp.status === 404) {
        await fetch(`${BASE_URL}/users/${USERNAME}`, {
          method: "POST"
        });
        setTasks([]);
        return;
      }

      console.log("Error cargando usuario:", resp.status);
    } catch (error) {
      console.log("Error de red:", error);
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // 2) Añadir tarea (POST a la API)
  const addTask = async (text) => {
    if (!text.trim()) return;

    const task = {
      label: text,
      is_done: false
    };

    try {
      const resp = await fetch(`${BASE_URL}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!resp.ok) {
        console.log("Error creando tarea:", resp.status);
        return;
      }

      // Una vez creada en el servidor, recargo la lista
      fetchTasks();
    } catch (error) {
      console.log("Error de red al crear tarea:", error);
    }
  };

  // 3) Borrar UNA tarea (DELETE por id)
  const deleteTask = async (todoId) => {
    try {
      const resp = await fetch(`${BASE_URL}/todos/${todoId}`, {
        method: "DELETE"
      });

      if (!resp.ok) {
        console.log("Error al borrar tarea:", resp.status);
        return;
      }

      fetchTasks();
    } catch (error) {
      console.log("Error de red al borrar tarea:", error);
    }
  };

  // 4) Borrar TODAS las tareas (DELETE usuario y recrearlo)
  const clearAll = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/users/${USERNAME}`, {
        method: "DELETE"
      });

      if (!resp.ok) {
        console.log("Error borrando todo:", resp.status);
        return;
      }

      // volvemos a crear el usuario vacío
      await fetch(`${BASE_URL}/users/${USERNAME}`, {
        method: "POST"
      });

      setTasks([]);
    } catch (error) {
      console.log("Error de red al borrar todo:", error);
    }
  };

  return (
    <div className="todo-app">
      <h1>Lista To Do Layla</h1>

      <Form onAddTask={addTask} />

      <List tasks={tasks} onDeleteTask={deleteTask} />

      <p>
        {tasks.length === 0
          ? "No hay tareas"
          : `${tasks.length} tareas pendientes`}
      </p>

      <button onClick={clearAll}>Eliminar todas</button>
    </div>
  );
};

export default Home;
