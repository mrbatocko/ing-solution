import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const { String, Number, Mixed } = Schema.Types;

const UserSchema = new Schema({
  username: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    minlength: 6,
    type: Mixed
  },
  created_at: Number
});

UserSchema.pre('save', function (next) {
  const now = Date.now();
  this.created_at = now;
  bcrypt.hash(this.password, 10, (error, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
}

export default UserSchema;