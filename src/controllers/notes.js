import { Router } from 'express';
import { Note, User } from '../models/index.js';
import { tokenExtractor } from '../util/middlewares.js';

const NotesRouter = Router();

const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id, {
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name'],
        },
    });
    if (!req.note) {
        return res.status(404).end();
    }
    next();
};

//Get all notes
NotesRouter.get('/', async (req, res) => {
    const notes = await Note.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name'],
        },
    });
    res.json(notes);
});

//Get one note
NotesRouter.get('/:id', noteFinder, async (req, res) => {
    res.json(req.note);
});

//Create one note
NotesRouter.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const note = await Note.create({
            ...req.body,
            userId: user.id,
            date: new Date(),
        });
        res.json(note);
    } catch (error) {
        next(error);
    }
});

//Update one note
NotesRouter.put('/:id', noteFinder, async (req, res, next) => {
    try {
        req.note.important = req.body.important;
        await req.note.save();
        res.json(req.note);
    } catch (error) {
        next(error);
    }
});

//Delete one note
NotesRouter.delete('/:id', noteFinder, async (req, res) => {
    await req.note.destroy();
    res.status(204).end();
});

export default NotesRouter;
