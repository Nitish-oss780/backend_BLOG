import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  photo: {
    data:Buffer,
    contentType:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
