import mongoose from 'mongoose';
import UserSchema from './userSchema';

export default mongoose.model('User', UserSchema);