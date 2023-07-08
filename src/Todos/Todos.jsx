import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Todos.css";
import TodoForm from "./components/TodoForm";
import TodoCategory from "./components/TodoCategory";
import TodoSection from "./components/TodoSection";

const api = axios.create({ baseURL: "http://localhost:8080/" });

function Todos(props) {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

  function navigateTo(path) {
    navigate(path);
  }

  useEffect(() => {
    if (localStorage.getItem("user_id") != null && verifyUser()) {
      getTodos(props.sectionId);
    } else {
      navigateTo("/signin");
    }
  }, [props.sectionId]);

  async function verifyUser() {
    try {
      let user_id = localStorage.getItem("user_id");
      if (user_id !== null) {
        let data = await api.get(`user/${user_id}`).then((data) => data);
        if (data.name === localStorage.getItem("user_name")) {
          return true;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async function getTodos(secId) {
    try {
      let data = await api
        .get(`todos/${secId}/${localStorage.getItem("user_id")}`)
        .then(({ data }) => data.data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSignout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
  }

  return (
    <article className="Todo-container">
      <div className="Todo-head">
        <h1>{localStorage.getItem("user_name")}'s To-do List</h1>
        <Link to="/signin" onClick={handleSignout} className="Signout-button">
          Sign out
        </Link>
      </div>
      <hr />
      <div className="todo-page-content">
        <TodoSection />
        <div className="todo-item-content">
          <TodoForm data={getTodos} secId={props.sectionId} /> <br />
          <div>
            <TodoCategory
              getRequest={getTodos}
              secId={props.sectionId}
              data={todos}
              name={props.section}
              value={props.sectionId !== "1"}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default Todos;
