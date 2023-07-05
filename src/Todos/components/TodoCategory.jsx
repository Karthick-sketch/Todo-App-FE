import TodoItems from './TodoItems';

export default function TodoCategory(props) {
  return (
    <section className="TodoSection">
      <div className="TodoSectionTitle">
        <h4 className="TodoSectionTitle-text">{props.name}</h4>
        <p className="TodoSectionTitle-remainingCount">({props.data.length})</p>
      </div>
      <TodoItems getRequest={props.getRequest} secId={props.secId} data={props.data} value={props.value}/>
    </section>
  );
}
