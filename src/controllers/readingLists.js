import { Router } from 'express';
import { Users_Blogs } from '../models/index.js';

const ReadingListsRouter = Router();

ReadingListsRouter.post('/', async (req, res) => {
    try {
        const relationship = await Users_Blogs.create(req.body);
        res.send(relationship);
    } catch {
        return res.status(400).send({ error: 'Invalid userId or blogId' });
    }
});

export default ReadingListsRouter;
