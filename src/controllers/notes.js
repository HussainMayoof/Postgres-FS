import express from 'express';
import Note from '../models/Note.js';

const NotesRouter = express.Router();

const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id);
    if (!req.note) {
        return res.status(404).end();
    }
    next();
};

//Get all notes
NotesRouter.get('/', async (req, res) => {
    const notes = await Note.findAll();
    res.json(notes);
});

//Get one note
NotesRouter.get('/:id', noteFinder, async (req, res) => {
    res.json(req.note);
});

//Create one note
NotesRouter.post('/', async (req, res) => {
    try {
        const note = await Note.create({ ...req.body, date: new Date() });
        res.json(note);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

//Update one note
NotesRouter.put('/:id', noteFinder, async (req, res) => {
    try {
        req.note.important = req.body.important;
        await req.note.save();
        res.json(req.note);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

//Delete one note
NotesRouter.delete('/:id', noteFinder, async (req, res) => {
    await req.note.destroy();
    res.status(204).end();
});

export default NotesRouter;
