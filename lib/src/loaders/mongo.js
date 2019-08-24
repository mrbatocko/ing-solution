import mongoose from 'mongoose';
import config from '../config';

export default (cb = () => {}) => {
  mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true });
  mongoose.connection.on('open' , () => {
    console.log('MongoDB connection opened');
    cb();
  });
}