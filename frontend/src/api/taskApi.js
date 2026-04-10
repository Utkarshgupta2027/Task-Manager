import axios from 'axios';

const BASE = '/api/tasks';

export const fetchTasks    = ()           => axios.get(BASE);
export const createTask    = (title)      => axios.post(BASE, { title });
export const updateTask    = (id, data)   => axios.patch(`${BASE}/${id}`, data);
export const deleteTask    = (id)         => axios.delete(`${BASE}/${id}`);