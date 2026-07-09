import api from './axios';
//create a function for each call to keep a clean code
export const getProjects = () => api.get('/projects'); 
export const createProject = (name) => api.post('/projects', { name });
export const deleteProject = (id) => api.delete(`/projects/${id}`);