import { useState } from 'react';
import { Plus } from 'lucide-react';

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
        placeholder="Añadir una tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-white text-sm placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="px-3 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sin proyecto</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Añadir
      </button>
    </form>
  );
}

export default TaskForm;