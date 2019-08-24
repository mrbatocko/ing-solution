import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser
} from '../../controllers/users/usersController';
import authMiddleware from '../../middlewares/auth';

const usersRouter = express.Router();


usersRouter.get('/', authMiddleware, getUsers);
usersRouter.get('/:id', authMiddleware, getUser);
usersRouter.post('/', createUser);
usersRouter.put('/:id', authMiddleware, updateUser);

export default usersRouter;