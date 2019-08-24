import express from 'express';
import {
  getSections
} from '../../controllers/sections/sectionsController';

const sectionsRouter = express.Router();

sectionsRouter.get('/', getSections);

export default sectionsRouter;