import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  answerOnPost
} from '../../controllers/posts/postsController';
import authMiddleware from '../../middlewares/auth';

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPost);
postsRouter.post('/', authMiddleware, createPost);
postsRouter.post('/:id/answer', authMiddleware, answerOnPost);

export default postsRouter;