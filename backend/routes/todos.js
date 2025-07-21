import express from 'express';
import { getDB } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const db = getDB();
  const todos = await db.all('SELECT * FROM todos');
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const db = getDB();
  const result = await db.run('INSERT INTO todos (title) VALUES (?)', title);
  res.json({ id: result.lastID, title, completed: 0 });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const db = getDB();
  await db.run('UPDATE todos SET title = ?, completed = ? WHERE id = ?', title, completed, id);
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = getDB();
  await db.run('DELETE FROM todos WHERE id = ?', id);
  res.sendStatus(200);
});

export default router;
