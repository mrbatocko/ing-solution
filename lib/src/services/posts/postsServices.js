import PostModel from '../../models/post/postModel';
import promisifyObjectMethods from '../../utils/promisifyObjectMethods';

const services = {
  getPosts: async cb => {
    try {
      const posts = PostModel.find({})
      cb(null, posts);
    } catch (error) {
      cb(error);
    }
  },
  getPost: async (_id, cb) => {
    try {
      const post = await PostModel.findById(_id)
      cb(null, post);
    } catch (error) {
      cb(error);
    }
  },
  createPost: async (post, cb) => {
    try {
      const postDoc = await PostModel.create(post);
      cb(null, postDoc);
    } catch (error) {
      cb(error);
    }
  },
  answerOnPost: async (_id, answer, cb) => {
    try {
      const postDoc = await PostModel.find({ _id });
      postDoc.answers.push(answer);
      try {
        await postDoc.save()
        cb(null);
      } catch (error) {
        cb(error);
      }
    } catch (error) {
      cb(error);
    }
  }
}

export default promisifyObjectMethods(services);