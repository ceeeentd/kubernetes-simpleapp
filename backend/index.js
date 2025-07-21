import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todos.js';
import { initDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

initDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
