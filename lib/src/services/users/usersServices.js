import UserModel from '../../models/user/userModel';
import promisifyObjectMethods from '../../utils/promisifyObjectMethods';

const services = {
  createUser: async (user, cb) => {
    try {
      const mongoUser = await UserModel.create(user);
      delete mongoUser._doc.password;
      cb(null, mongoUser);
    } catch (error) {
      cb(error);
    }
  },
  getUsers: async cb => {
    try {
      const users = await UserModel.find();
      cb(null, users);
    } catch (error) {
      cb(error);
    }
  },
  getUser: async (queryObject, cb) => {
    try {
      const user = await UserModel.find(queryObject);
      cb(null, user[0]);
    } catch (error) {
      cb(error);
    }
  }
}

export default promisifyObjectMethods(services);
