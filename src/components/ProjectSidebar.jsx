import { useState } from 'react';

function ProjectSidebar({ projects, selectedProject, onSelect, onCreate, onDelete }) {
  const [newProject, setNewProject] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    onCreate(newProject);
    setNewProject('');
  };

  return (
    <div className="w-full md:w-64 bg-slate-800 rounded p-4">
      <h2 className="text-slate-300 font-semibold mb-3">Proyectos</h2>

      <button
        onClick={() => onSelect(null)}
        className={`w-full text-left px-3 py-2 rounded mb-1 ${
          selectedProject === null ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
        }`}
      >
        Todas las tareas
      </button>

      {projects.map((p) => (
        <div key={p.id} className="flex items-center justify-between">
          <button
            onClick={() => onSelect(p.id)}
            className={`flex-1 text-left px-3 py-2 rounded mb-1 truncate ${
              selectedProject === p.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {p.name}
          </button>
          <button
            onClick={() => onDelete(p.id)}
            className="text-slate-500 hover:text-red-400 text-xs px-2"
          >
            ✕
          </button>
        </div>
      ))}

      <form onSubmit={handleCreate} className="mt-4">
        <input
          type="text"
          placeholder="Nuevo proyecto..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          className="w-full px-2 py-1 text-sm rounded bg-slate-700 text-white outline-none"
        />
      </form>
    </div>
  );
}

export default ProjectSidebar;