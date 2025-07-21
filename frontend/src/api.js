import axios from 'axios';

const API_URL = 'http://localhost:3000/api/todos';

export const getTodos = () => axios.get(API_URL);
export const addTodo = (title) => axios.post(API_URL, { title });
export const updateTodo = (id, title, completed) =>
  axios.put(`${API_URL}/${id}`, { title, completed });
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
