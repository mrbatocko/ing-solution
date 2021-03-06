import express from 'express';
import { login, getLoggedInUserData } from '../../controllers/auth/authController';
import authMiddleware from '../../middlewares/auth';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.get('/me', authMiddleware, getLoggedInUserData);

export default authRouter;