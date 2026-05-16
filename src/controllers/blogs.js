import { Router } from 'express';
import { Blog, User } from '../models/index.js';
import { tokenExtractor } from '../util/middlewares.js';

const BlogsRouter = Router();

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id, {
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name'],
        },
    });
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
BlogsRouter.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        const blog = await Blog.create({ ...req.body, userId: user.id });
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
BlogsRouter.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    if (user.id !== req.blog.userId) {
        return res.status(401).end();
    }
    await req.blog.destroy();
    return res.status(204).end();
});

export default BlogsRouter;
