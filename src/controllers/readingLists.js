import { Router } from 'express';
import { User, Users_Blogs } from '../models/index.js';
import { tokenExtractor } from '../util/middlewares.js';

const ReadingListsRouter = Router();

ReadingListsRouter.post('/', async (req, res) => {
    try {
        const relationship = await Users_Blogs.create(req.body);
        res.send(relationship);
    } catch {
        return res.status(400).send({ error: 'Invalid userId or blogId' });
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
