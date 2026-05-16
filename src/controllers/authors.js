import { Router } from 'express';
import { Blog } from '../models/index.js';
import sequelize from '../util/db.js';

const AuthorsRouter = Router();

//Get all authors
AuthorsRouter.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        ],
        order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
        group: 'author',
    });

    res.send(authors);
});

export default AuthorsRouter;
