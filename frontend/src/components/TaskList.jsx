import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="state-msg">No tasks here.</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t}
          onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}