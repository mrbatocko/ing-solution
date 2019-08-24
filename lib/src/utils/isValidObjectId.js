import mongoose from 'mongoose';

export default id => {
  return id && mongoose.Types.ObjectId.isValid(id);
}