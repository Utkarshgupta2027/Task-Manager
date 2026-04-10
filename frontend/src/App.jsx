import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import TaskForm   from './components/TaskForm';
import FilterBar  from './components/FilterBar';
import TaskList   from './components/TaskList';

export default function App() {
  const [tasks,   setTasks]   = useState([]);
  const [filter,  setFilter]  = useState('all');   // all | active | completed
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await fetchTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleAdd = async (title) => {
    const { data } = await createTask(title);
    setTasks(prev => [data, ...prev]);
  };

  const handleToggle = async (id, completed) => {
    const { data } = await updateTask(id, { completed: !completed });
    setTasks(prev => prev.map(t => t.id === id ? data : t));
  };

  const handleEdit = async (id, title) => {
    const { data } = await updateTask(id, { title });
    setTasks(prev => prev.map(t => t.id === id ? data : t));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const visible = tasks.filter(t =>
    filter === 'all'       ? true :
    filter === 'active'    ? !t.completed :
    /* completed */           t.completed
  );

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={handleAdd} />
      <FilterBar filter={filter} onChange={setFilter} total={tasks.length}
                 done={tasks.filter(t => t.completed).length} />
      {loading && <p className="state-msg">Loading…</p>}
      {error   && <p className="state-msg error">{error}</p>}
      {!loading && !error && (
        <TaskList tasks={visible} onToggle={handleToggle}
                  onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}