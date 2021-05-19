import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
  name: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
  content: { type: String },
  author: {
    type: String,
  },
  articleImage: { type: String },
});
