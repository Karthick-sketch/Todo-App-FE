import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddTodoForm from './components/AddTodoForm';
import TodoCategory from './components/TodoCategory'
import './Todos.css';
import TodoSection from './components/TodoSection';

const api = axios.create({ baseURL: "http://localhost:8080/" });

function Todos(props) {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [sectionId, setSectionId] = useState(props.sectionId);

  function navigateTo(path) { navigate(path); }

/* here */

  useEffect(() => {
    if (sectionId !== props.sectionId) {
      console.log(sectionId);
      getTodos();
      setSectionId(props.sectionId);
    }
    if (localStorage.getItem("user_id") != null && verifyUser()) {
      getTodos();
    } else { navigateTo("/signin"); }
  }, []);

  async function verifyUser() {
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
      let data = await api.get(`todos/${sectionId}/${localStorage.getItem("user_id")}`).then(({data}) => data.data);
      setTodos(data);
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
      <div className='todo-page-content'>
        <TodoSection/>
        <div className="todo-item-content">
          <AddTodoForm data={getTodos}/> <br/>
          <div>
            <TodoCategory getRequest={getTodos} data={todos} name={props.section} value={true}/>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Todos;
