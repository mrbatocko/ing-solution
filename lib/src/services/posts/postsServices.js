import PostModel from '../../models/post/postModel';
import promisifyObjectMethods from '../../utils/promisifyObjectMethods';

const services = {
  getPosts: async (query, cb) => {
    try {
      const posts = PostModel.find(query).sort('-timestamp');
      cb(null, posts);
    } catch (error) {
      cb(error);
    }
  },
  getPost: async (id, cb) => {
    try {
      const post = await PostModel.findById(id);
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
  resolvePost: async (id, cb) => {
    try {
      const post = await PostModel.findById(id);
      post.resolved = true;
      await post.save();
      cb(null);
    } catch (error) {
      cb(error);
    }
  },
  reopenPost: async (id, cb) => {
    try {
      const post = await PostModel.findById(id);
      post.resolved = false;
      await post.save();
      cb(null);
    } catch (error) {
      cb(error);
    }
  },
  deletePost: async (id, cb) => {
    try {
      await PostModel.remove({ _id: id });
      cb(null);
    } catch (error) {
      cb(error);
    }
  }
}

export default promisifyObjectMethods(services);