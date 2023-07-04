import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddTodoForm from './components/AddTodoForm';
import TodoCategory from './components/TodoCategory'
import './Todos.css';

const api = axios.create({ baseURL: "http://localhost:8080/" });

function Todos() {
  const navigate = useNavigate();

  const today = (new Date()).getTime();
  const [overdue, setOverdue] = useState([]);
  const [due_today, setDueToday] = useState([]);
  const [due_later, setDueLater] = useState([]);

  function navigateTo(path) { navigate(path); }

  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      if (getUser()) { getTodos(); }
      else { navigateTo("/signin"); }
    } else { navigateTo("/signin"); }
  }, []);

  async function getUser() {
    try {
      let user_id = localStorage.getItem("user_id");
      if (user_id !== null) {
        let data = await api.get(`user/${user_id}`).then((data) => data);
        if (data.name === localStorage.getItem("user_name")) {
          return true;
        }
      }
    } catch (error) { console.log(error); }
    return false;
  }

  async function getTodos() {
    try {
      let data = await api.get(`todos/${localStorage.getItem("user_id")}`).then(({data}) => data.data);
      console.log(data);
      setOverdue(data.filter(todo => todo.dueDate < today));
      setDueToday(data.filter(todo => todo.dueDate === today));
      setDueLater(data.filter(todo => todo.dueDate > today));
    } catch(error) { console.log(error); }
  }

  function handleSignout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
  }

  return (
    <article className="Todo-container">
      <div className="Todo-head">
        <h1>{localStorage.getItem("user_name")}'s To-do List</h1>
        <Link to="/signin" onClick={handleSignout} className="Signout-button">Sign out</Link>
      </div>
        <hr/>
      <div className="TodoPage-content">
        <AddTodoForm data={getTodos}/> <br/>
        <div>
          <TodoCategory getRequest={getTodos} data={overdue} name="Overdue" value={true}/>
          <TodoCategory getRequest={getTodos} data={due_today} name="Due Today" value={false}/>
          <TodoCategory getRequest={getTodos} data={due_later} name="Due Later" value={true}/>
        </div>
      </div>
    </article>
  );
}

export default Todos;
