import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  resolvePost,
  reopenPost,
  deletePost
} from '../../controllers/posts/postsController';
import {
  answerOnPost,
  vodeForPostAnswer,
  deletePostAnswer,
} from '../../controllers/answers/answersController';
import authMiddleware from '../../middlewares/auth';

const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPost);
postsRouter.delete('/:id', deletePost);
postsRouter.post('/', authMiddleware, createPost);

postsRouter.post('/:id/resolve', resolvePost);
postsRouter.post('/:id/reopen', reopenPost);

postsRouter.post('/:id/answer', authMiddleware, answerOnPost);
postsRouter.put('/:id/answer/:answerId', authMiddleware, vodeForPostAnswer);
postsRouter.delete('/:id/answer/:answerId', authMiddleware, deletePostAnswer);


export default postsRouter;