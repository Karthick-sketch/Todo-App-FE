import TodoItems from './TodoItems';

export default function TodoCategory(props) {
  function completedTodosCount() {
    let count = 0;
    for (let i of props.data) {
      if (i.completed) count++;
    }

    return count;
  }

  return (
    <section className="TodoSection">
      <div className="TodoSectionTitle">
        <h4 className="TodoSectionTitle-text">{props.name}</h4>
        <p className="TodoSectionTitle-remainingCount">{completedTodosCount()} / {props.data.length}</p>
      </div>
      <TodoItems getRequest={props.getRequest} data={props.data} value={props.value}/>
    </section>
  );
}
