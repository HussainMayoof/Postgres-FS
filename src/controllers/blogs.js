import { Router } from 'express';
import { Blog } from '../models/index.js';

const BlogsRouter = Router();

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
        return res.status(404).end();
    }
    next();
};

//Get all blogs
BlogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

//Get one blog
BlogsRouter.get('/:id', blogFinder, async (req, res) => {
    res.json(req.blog);
});

//Create one blog
BlogsRouter.post('/', async (req, res, next) => {
    try {
        const blog = await Blog.create({ ...req.body });
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

//Update one blog
BlogsRouter.put('/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes = req.body.likes;
        await req.blog.save();
        res.json(req.blog);
    } catch (error) {
        next(error);
    }
});

//Delete one blog
BlogsRouter.delete('/:id', blogFinder, async (req, res) => {
    await req.blog.destroy();
    return res.status(204).end();
});

export default BlogsRouter;
