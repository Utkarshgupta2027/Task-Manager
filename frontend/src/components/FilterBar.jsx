export default function FilterBar({ filter, onChange, total, done }) {
  const opts = ['all', 'active', 'completed'];
  return (
    <div className="filter-bar">
      <span className="counts">{done}/{total} completed</span>
      <div className="filter-btns">
        {opts.map(o => (
          <button key={o}
            className={filter === o ? 'active' : ''}
            onClick={() => onChange(o)}>
            {o[0].toUpperCase() + o.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}