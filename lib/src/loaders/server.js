import express from 'express';
import morgan from 'morgan';
import config from '../config';
import cors from 'cors';

import usersRouter from '../api/users/usersRoutes';
import authRouter from '../api/auth/authRoutes';
import postsRouter from '../api/posts/postsRoutes';

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const loggingFormat = config.env === 'development' ? 'dev' : 'combined';
app.use(morgan(loggingFormat));

apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', postsRouter);
app.use('/api', apiRouter);

app.listen(config.port);

export default app;