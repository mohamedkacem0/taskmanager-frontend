import { useState } from 'react';
import { Folder, Layers, X, Plus } from 'lucide-react';

function ProjectSidebar({ projects, selectedProject, onSelect, onCreate, onDelete }) {
  const [newProject, setNewProject] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    onCreate(newProject);
    setNewProject('');
  };

  return (
    <div className="w-full md:w-64 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 h-fit">
      <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
        Proyectos
      </h2>

      <button
        onClick={() => onSelect(null)}
        className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg mb-1 text-sm transition ${
          selectedProject === null
            ? 'bg-blue-600 text-white'
            : 'text-slate-300 hover:bg-slate-700/50'
        }`}
      >
        <Layers className="w-4 h-4" />
        Todas las tareas
      </button>

      {projects.map((p) => (
        <div key={p.id} className="group flex items-center">
          <button
            onClick={() => onSelect(p.id)}
            className={`flex-1 flex items-center gap-2 text-left px-3 py-2 rounded-lg mb-1 truncate text-sm transition ${
              selectedProject === p.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            <Folder className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{p.name}</span>
          </button>
          <button
            onClick={() => onDelete(p.id)}
            className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition p-1.5 mr-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}

      <form onSubmit={handleCreate} className="mt-3 relative">
        <input
          type="text"
          placeholder="Nuevo proyecto..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className="w-full pl-3 pr-8 py-2 text-sm rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400">
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default ProjectSidebar;