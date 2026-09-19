import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const BASE = `${API_BASE_URL}/api/tasks`;

export const fetchTasks    = ()           => axios.get(BASE);
export const createTask    = (title)      => axios.post(BASE, { title });
export const updateTask    = (id, data)   => axios.patch(`${BASE}/${id}`, data);
export const deleteTask    = (id)         => axios.delete(`${BASE}/${id}`);
