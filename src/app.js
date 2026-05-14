import express from 'express'
import NotesRouter from './routes/notes.js'
import BlogsRouter from './routes/blogs.js'
const app = express()
app.use(express.json())

app.use('/api/notes', NotesRouter)
app.use('/api/blogs', BlogsRouter)

export default app