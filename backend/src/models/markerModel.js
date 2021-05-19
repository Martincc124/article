import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const MarkerSchema = new Schema({
  lat: { type: Number, required: true },
  lng: {
    type: Number,
    required: true,
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  article: { type: String, required: true },
});
