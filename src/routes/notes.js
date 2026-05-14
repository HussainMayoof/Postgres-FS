import express from 'express'
import Note from '../models/Note.js'

const NotesRouter = express.Router()

//Get all notes
NotesRouter.get('/', async (req, res) => {
    const notes = await Note.findAll()
    console.log(JSON.stringify(notes, null, 2))
    res.json(notes)
})

//Get one note
NotesRouter.get('/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
        console.log(note.toJSON())
        res.json(note)
    } else {
        res.status(404).end()
    }
})

//Create one note
NotesRouter.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const note = await Note.create({...req.body, date: new Date()})
        console.log(note.toJSON())
        res.json(note)
    } catch (error) {
        return res.status(400).json({error})
    }
})

//Update one note
NotesRouter.put('/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
        try {
            note.important = req.body.important
            await note.save()
            console.log(note.toJSON())
            res.json(note)
        } catch (error) {
            return res.status(400).json({error})
        }
    } else {
        res.status(404).end()
    }
})

export default NotesRouter