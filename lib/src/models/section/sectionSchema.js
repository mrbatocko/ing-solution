import { Schema } from 'mongoose';
const { String } = Schema.Types;

const SectionSchema = new Schema({
  name: {
    required: true,
    unique: true,
    type: String
  },
  description: {
    type: String,
    minlength: 20,
    maxlength: 300
  }
});

export default SectionSchema;