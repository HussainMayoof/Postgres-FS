import { Router } from 'express';
import { Blog, Note, User } from '../models/index.js';

const TestsRouter = Router();

TestsRouter.get('/', (req, res) => {
    res.status(200).end();
});

TestsRouter.post('/api/reset', async (req, res) => {
    await Note.truncate({ cascade: true });
    await Blog.truncate({ cascade: true });
    await User.truncate({ cascade: true });
    res.status(200).end();
});

export default TestsRouter;
