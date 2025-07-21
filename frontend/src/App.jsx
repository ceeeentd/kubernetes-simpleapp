import { useEffect, useState } from 'react';
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTodo(newTitle);
    setNewTitle('');
    loadTodos();
  };

  const handleToggle = async (todo) => {
    await updateTodo(todo.id, todo.title, !todo.completed);
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Todo List</h2>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: '0.5rem 0' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '1rem' }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
