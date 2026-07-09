import api from './axios';
//create a function for each call to keep a clean code
export const getTasks = (filters = {}) => api.get('/tasks', { params: filters });
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);