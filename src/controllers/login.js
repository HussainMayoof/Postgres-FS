import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { SECRET } from '../util/config.js';
import { Session, User } from '../models/index.js';

const LoginRouter = Router();

LoginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    const passwordCorrect = password === 'secret';

    if (!(user && passwordCorrect)) {
        return next({ name: 'LoginError' });
    }

    if (user.disabled) {
        return res
            .status(401)
            .json({ error: 'Account disabled, please contact admin' });
    }

    const { name, id } = user;
    const session = await Session.create({ userId: id });
    const token = jwt.sign({ username, id, sessionId: session.id }, SECRET);

    res.status(200).send({ token, username, name });
});

export default LoginRouter;
