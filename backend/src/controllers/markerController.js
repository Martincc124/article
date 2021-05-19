import mongoose from "mongoose";
import { MarkerSchema } from "../models/markerModel.js";

const Marker = mongoose.model("Marker", MarkerSchema);

export const addNewMarker = (req, res) => {
  let newMarker = new Marker({
    lat: req.body.lat,
    lng: req.body.lng,
    title: req.body.title,
    text: req.body.text,
    article: req.body.article,
  });

  newMarker.save((err, marker) => {
    if (err) {
      res.send(err);
    }
    res.json(marker);
  });
};

export const getMarkers = (req, res) => {
  Marker.find({}, (err, marker) => {
    if (err) {
      res.send(err);
    }
    res.json(marker);
  });
};
