import { Router } from 'express';
import { Blog, User, Users_Blogs } from '../models/index.js';
import { tokenExtractor } from '../util/middlewares.js';

const ReadingListsRouter = Router();

ReadingListsRouter.post('/', async (req, res, next) => {
    const { blogId, userId } = req.body;

    if (!blogId) {
        return res.status(400).json({ error: 'blogId is required' });
    }
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const existing = await Users_Blogs.findOne({ where: { blogId, userId } });
    if (existing) {
        return res.status(400).json({ error: 'Already in reading list' });
    }

    try {
        const relationship = await Users_Blogs.create({ blogId, userId });
        res.send(relationship);
    } catch {
        next();
    }
});

ReadingListsRouter.put('/:id', tokenExtractor, async (req, res, next) => {
    const relationship = await Users_Blogs.findByPk(req.params.id);
    const user = await User.findByPk(req.decodedToken.id);

    if (!relationship) {
        return res.status(404).end();
    }

    if (relationship.userId !== user.id) {
        return res.status(401).end();
    }

    try {
        relationship.read = req.body.read;
        await relationship.save();
        res.send(relationship);
    } catch {
        return next();
    }
});

export default ReadingListsRouter;
