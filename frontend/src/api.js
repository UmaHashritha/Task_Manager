import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const BACKEND_URL = "http://localhost:5000";
export const fetchTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, fields) => axios.put(`${API_URL}/${id}`, fields);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const reorderTasks = (orderedIds) => axios.post(`${API_URL}/reorder`, { orderedIds });
