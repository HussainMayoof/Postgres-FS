import { Router } from 'express';
import { tokenExtractor } from '../util/middlewares.js';
import { Session } from '../models/index.js';

const LogoutRouter = Router();

LogoutRouter.delete('/', tokenExtractor, async (req, res) => {
    const session = await Session.findByPk(req.decodedToken.sessionId);
    await session.destroy();
    res.status(204).end();
});

export default LogoutRouter;
