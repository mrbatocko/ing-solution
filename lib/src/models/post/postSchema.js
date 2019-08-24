import { Schema } from 'mongoose';
const { String, Number, ObjectId } = Schema.Types;

const userWithIdAndUsernameSchema = new Schema({
  userId: {
    required: true,
    type: ObjectId
  },
  username: {
    required: true,
    type: String
  }
});

const postAnswerSchema = new Schema({
  user: userWithIdAndUsernameSchema,
  content: {
    required: true,
    type: String
  },
  timestamp: {
    required: true,
    type: Number
  },
  upvotes: [ObjectId],
  downvotes: [ObjectId]
});

const postSchema = new Schema({
  content: {
    required: true,
    type: String,
    trim: true
  },
  owner: userWithIdAndUsernameSchema,
  timestamp: {
    required: true,
    type: Number
  },
  section: {
    required: true,
    type: ObjectId
  },
  answers: [postAnswerSchema]
});

export default postSchema;