import { Link } from 'react-router-dom';

export default function TodoSection() {

  return (
    <aside className="todo-section">
      <h2>Sections</h2>
      <ul className="todo-section-list">
        <li><Link to="/todos/duetoday" className='todo-section-title'>Due today</Link></li>
        <li><Link to="/todos/overdue" className='todo-section-title'>Overdue</Link></li>
        <li><Link to="/todos/duelater" className='todo-section-title'>Due later</Link></li>
        <li><Link to="/todos/completed" className='todo-section-title'>Completed</Link></li>
      </ul>
    </aside>
  );
}
