import express from 'express';
import NotesRouter from './controllers/notes.js';
import BlogsRouter from './controllers/blogs.js';
const app = express();
app.use(express.json());

app.use('/api/notes', NotesRouter);
app.use('/api/blogs', BlogsRouter);

export default app;
