import { Router } from 'express';
import { Note, User } from '../models/index.js';

const UsersRouter = Router();

//Get all users
UsersRouter.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Note,
            attributes: {
                exclude: ['userId'],
            },
        },
    });
    res.json(users);
});

//Get one user
UsersRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
});

//Create one user
UsersRouter.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

//Update one user
UsersRouter.put('/:username', async (req, res, next) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (user) {
        try {
            user.name = req.body.name;
            await user.save();
            res.send(user);
        } catch (error) {
            next(error);
        }
    } else {
        res.status(404).end();
    }
});

export default UsersRouter;
