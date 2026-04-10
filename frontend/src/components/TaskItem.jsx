import { useState } from 'react';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing]   = useState(false);
  const [draft,   setDraft]     = useState(task.title);
  const [busy,    setBusy]      = useState(false);

  const saveEdit = async () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === task.title) { setEditing(false); return; }
    setBusy(true);
    await onEdit(task.id, trimmed);
    setBusy(false);
    setEditing(false);
  };

  const date = new Date(task.createdAt).toLocaleDateString();

  return (
    <li className={`task-item ${task.completed ? 'done' : ''}`}>
      <input type="checkbox" checked={task.completed}
             onChange={() => onToggle(task.id, task.completed)} />

      {editing ? (
        <input className="edit-input" value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={e => { if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') setEditing(false); }}
          autoFocus disabled={busy} />
      ) : (
        <span className="task-title" onDoubleClick={() => setEditing(true)}>
          {task.title}
        </span>
      )}

      <span className="task-date">{date}</span>
      <button className="btn-delete" onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}