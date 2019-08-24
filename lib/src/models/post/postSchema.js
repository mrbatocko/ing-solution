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

const sectionWithIdAndNameSchema = new Schema({
  sectionId: {
    required: true,
    type: ObjectId
  },
  name: {
    required: true,
    type: String
  }
});

const postSchema = new Schema({
  title: {
    required: true,
    trim: true,
    type: String
  },
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
  section: sectionWithIdAndNameSchema,
  answers: [postAnswerSchema],
  resolved: {
    default: false,
    type: Boolean
  }
});

export default postSchema;