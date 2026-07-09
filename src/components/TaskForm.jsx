import { useState } from 'react';

function TaskForm({ projects, onCreate }) {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title, projectId: projectId || null });
    setTitle('');
    setProjectId('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="px-3 py-2 rounded bg-slate-700 text-white outline-none"
      >
        <option value="">Sin proyecto</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Añadir
      </button>
    </form>
  );
}

export default TaskForm;