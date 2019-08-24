import { model } from 'mongoose';
import postSchema from './postSchema';

const postModel = new model('Post', postSchema);

export default postModel;