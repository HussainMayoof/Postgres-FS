import express from 'express'
import Blog from '../models/Blog.js'
import Note from '../models/Note.js'

const BlogsRouter = express.Router()

//Get all blogs
BlogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

//Create one blog
BlogsRouter.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const blog = await Blog.create({...req.body})
        console.log(blog.toJSON())
        res.json(blog)
    } catch (error) {
        return res.status(400).json({error})
    }
})

//Delete one blog
BlogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    return res.status(204).end()
})

export default BlogsRouter