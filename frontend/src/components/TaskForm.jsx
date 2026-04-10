import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [busy,  setBusy]  = useState(false);
  const [err,   setErr]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) { setErr('Title is required'); return; }
    try {
      setBusy(true);
      setErr('');
      await onAdd(trimmed);
      setTitle('');
    } catch {
      setErr('Could not add task. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => { setTitle(e.target.value); setErr(''); }}
        placeholder="New task title…"
        disabled={busy}
      />
      <button type="submit" disabled={busy}>
        {busy ? 'Adding…' : 'Add Task'}
      </button>
      {err && <span className="form-error">{err}</span>}
    </form>
  );
}