import { useState, useEffect } from 'react';
import { CheckSquare, LogOut, ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as projectsApi from '../api/projects';
import * as tasksApi from '../api/tasks';
import ProjectSidebar from '../components/ProjectSidebar';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

function Dashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [projectsRes, tasksRes] = await Promise.all([
      projectsApi.getProjects(),
      tasksApi.getTasks(selectedProject ? { projectId: selectedProject } : {}),
    ]);
    setProjects(projectsRes.data);
    setTasks(tasksRes.data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, [selectedProject]);

  const handleCreateProject = async (name) => {
    await projectsApi.createProject(name);
    loadData();
  };

  const handleDeleteProject = async (id) => {
    await projectsApi.deleteProject(id);
    if (selectedProject === id) setSelectedProject(null);
    loadData();
  };

  const handleCreateTask = async (data) => {
    await tasksApi.createTask({ ...data, projectId: data.projectId || selectedProject });
    loadData();
  };

  const handleToggleTask = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await tasksApi.updateTask(task.id, { ...task, status: newStatus });
    loadData();
  };

  const handleDeleteTask = async (id) => {
    await tasksApi.deleteTask(id);
    loadData();
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm hidden sm:block">Hola, {user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 text-sm transition"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <ProjectSidebar
            projects={projects}
            selectedProject={selectedProject}
            onSelect={setSelectedProject}
            onCreate={handleCreateProject}
            onDelete={handleDeleteProject}
          />

          <div className="flex-1">
            {tasks.length > 0 && (
              <p className="text-slate-500 text-sm mb-3">
                {completedCount} de {tasks.length} tareas completadas
              </p>
            )}

            <TaskForm projects={projects} onCreate={handleCreateTask} />

            {loading ? (
              <p className="text-slate-500 text-sm">Cargando...</p>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                  <ClipboardList className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400 text-sm">No hay tareas todavía</p>
                <p className="text-slate-600 text-xs mt-1">Añade una arriba para empezar</p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;