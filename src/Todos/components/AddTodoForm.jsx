import React from 'react';

class AddTodoForm extends React.Component {
  state = { title: "", dueDate: "", user_id: localStorage.getItem("user_id") }

  handleSubmit = async () => {
    if (this.state.title !== "" && this.state.dueDate !== "") {
      try {
        let res = await api.post("todo", this.state);
        if (res.status === 200) {
          this.props.data();
          document.getElementsByClassName('AddTodo-text')[0].value = "";
          document.getElementsByClassName('AddTodo-date')[0].value = "";
        }
      } catch(error) { console.log(error); }
    }
  }

  handleTodoText = (e) => {
    this.setState({ title: e.target.value });
    e.preventDefault();
  }

  handleDueDate = (e) => {
    this.setState({ dueDate: e.target.value });
    e.preventDefault();
  }

  render() {
    return (
      <div className="AddTodo">
        <input type="text" className="AddTodo-text" placeholder="What's next?" onChange={this.handleTodoText} autoComplete="off" autoFocus/>
        <input type="date" className="AddTodo-date" onChange={this.handleDueDate}/>
        <button className="AddTodo-button" onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}

export default AddTodoForm;
