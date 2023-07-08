import axios from "axios";
import React from "react";

const api = axios.create({ baseURL: "http://localhost:8080/" });

class TodoForm extends React.Component {
  state = {
    title: "",
    dueDate: "",
    userId: Number(localStorage.getItem("user_id")),
  };

  handleSubmit = async () => {
    if (this.state.title !== "" && this.state.dueDate !== "") {
      try {
        let res = await api.post("todo", this.state);
        if (res.status === 200) {
          this.props.data(this.props.secId);
          document.getElementsByClassName("AddTodo-text")[0].value = "";
          document.getElementsByClassName("AddTodo-date")[0].value = "";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleTodoText = (e) => {
    this.setState({ title: e.target.value });
    e.preventDefault();
  };

  handleDueDate = (e) => {
    let dts = e.target.value.split("-");
    let date = new Date(dts[0], dts[1] - 1, dts[2]);
    this.setState({ dueDate: date.getTime() });
    e.preventDefault();
  };

  render() {
    return (
      <div className="AddTodo">
        <input
          type="text"
          className="AddTodo-text"
          placeholder="What's next?"
          onChange={this.handleTodoText}
        />
        <input
          type="date"
          className="AddTodo-date"
          onChange={this.handleDueDate}
        />
        <button className="AddTodo-button" onClick={this.handleSubmit}>
          Add
        </button>
      </div>
    );
  }
}

export default TodoForm;
