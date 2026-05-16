import express from 'express';
import NotesRouter from './controllers/notes.js';
import BlogsRouter from './controllers/blogs.js';
import { errorHandler } from './util/middlewares.js';
import UsersRouter from './controllers/users.js';
import LoginRouter from './controllers/login.js';
import AuthorsRouter from './controllers/authors.js';
import TestsRouter from './controllers/tests.js';
const app = express();
app.use(express.json());

app.use('/api/notes', NotesRouter);
app.use('/api/blogs', BlogsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/login', LoginRouter);
app.use('/api/authors', AuthorsRouter);
app.use('/', TestsRouter);
app.use(errorHandler);

export default app;
