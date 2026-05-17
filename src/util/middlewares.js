import jwt from 'jsonwebtoken';
import { SECRET } from './config.js';
import { Blog, Session, User } from '../models/index.js';

const errorHandler = (error, req, res, next) => {
    if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
    ) {
        console.log(error.message);

        return res.status(400).send({ error: error.errors[0].message });
    } else if (error.name === 'LoginError') {
        const message = 'Invalid username or password';
        console.log(message);

        return res.status(401).send({ error: message });
    } else if (error.name === 'InvalidTokenError') {
        const message = 'Invalid token';
        console.log(message);

        return res.status(401).send({ error: message });
    } else if (error.name === 'MissingTokenError') {
        const message = 'Missing token';
        console.log(message);

        return res.status(401).send({ error: message });
    } else {
        console.log(error.message);
        console.log(error.name);
    }

    next(error);
};

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const decodedToken = jwt.verify(authorization.substring(7), SECRET);
            const session = await Session.findByPk(decodedToken.sessionId);
            if (!session) {
                return res.status(401).end();
            }
            req.decodedToken = decodedToken;
        } catch {
            return next({ name: 'InvalidTokenError' });
        }
    } else {
        return next({ name: 'MissingTokenError' });
    }

    next();
};

const isAdmin = async (req, res, next) => {
    const user = User.findByPk(req.decodedToken.id);
    if (!user.admin) {
        return res
            .status(401)
            .send('Only an admin can carry out this operation');
    }
    next();
};

export { errorHandler, tokenExtractor, isAdmin };
