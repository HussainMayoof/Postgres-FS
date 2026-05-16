import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { SECRET } from '../util/config.js';
import { User } from '../models/index.js';

const LoginRouter = Router();

LoginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    const passwordCorrect = password === 'secret';

    if (!(user && passwordCorrect)) {
        return next({ name: 'LoginError' });
    }

    const { name, id } = user;
    const token = jwt.sign({ username, id }, SECRET);

    res.status(200).send({ token, username, name });
});

export default LoginRouter;
