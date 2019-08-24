import promisifyObjectMethods from '../../utils/promisifyObjectMethods';
import userServices from '../users/usersServices';
import jwt from 'jsonwebtoken';
import config from '../../config';

const services = {
  login: async ({ username, password }, cb) => {
    try {
      const mongoUser = await userServices.getUser({ username });
      if (mongoUser) {
        try {
          const passwordsMatch = await mongoUser.comparePasswords(password);
          if (passwordsMatch) {
            delete mongoUser._doc.password;
            jwt.sign(
              mongoUser._doc,
              config.jwtSecret,
              { expiresIn: config.jwtLifetime },
              (error, token) => {
              if (error) {
                cb({ _message: 'Unable to sign token.' });
              } else {
                cb(null, { token });
              }
            }
            );
          } else {
            cb({ _message: 'Passwords do not match.' });
          }
        } catch (error) {
          cb(error);
        }
      } else {
        cb({ _message: 'User not found.' });
      }
    } catch (error) {
      cb(error);
    }
  }
}

export default promisifyObjectMethods(services);