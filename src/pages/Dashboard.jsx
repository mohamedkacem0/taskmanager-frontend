import { useState, useEffect } from 'react';
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

  useEffect(() => {
    loadData();
  }, [selectedProject]);

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

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Hola, {user?.name} 👋</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ProjectSidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelect={setSelectedProject}
          onCreate={handleCreateProject}
          onDelete={handleDeleteProject}
        />

        <div className="flex-1">
          <TaskForm projects={projects} onCreate={handleCreateTask} />

          {loading ? (
            <p className="text-slate-400">Cargando...</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-400">No hay tareas todavía.</p>
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
    </div>
  );
}

export default Dashboard;