import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/" });

export default function TodoItems(props) {
  async function handleDelete(id) {
    try {
      const data = await api.delete(`todo/${id}`);
      if (data.status === 200) {
        props.getRequest(props.secId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleComplete(id) {
    try {
      const data = await api.patch(`todo/${id}`);
      if (data.status === 200) {
        props.getRequest(props.secId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function isNotToday(dueDate) {
    return (
      <>
        {props.value && (
          <p className="TodoItem-dueDate">{new Date(dueDate).toDateString()}</p>
        )}
      </>
    );
  }

  const arr = props.data;
  const listItems = arr.map((todo) => (
    <li key={todo.id}>
      <label className="TodoItem-container">
        <div>
          <input
            type="checkbox"
            name="completed"
            className="TodoItem-checkbox"
            onChange={() => handleComplete(todo.id)}
            checked={todo.status}
          />
          <p>{todo.title}</p>
          <span>{isNotToday(todo.dueDate)}</span>
        </div>
        <button
          className="TodoItem-delete"
          onClick={() => handleDelete(todo.id)}
        >
          <img src="../src/assets/cross.svg" alt="Delete todo" />
        </button>
      </label>
    </li>
  ));

  return <ul className="TodoItem">{listItems}</ul>;
}
