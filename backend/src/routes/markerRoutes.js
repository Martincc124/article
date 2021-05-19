import { getMarkers, addNewMarker } from "../controllers/markerController.js";

const markerroutes = (app) => {
  app
    .route("/markers")
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getMarkers)

    // POST endpoint
    .post(addNewMarker);
};

export default markerroutes;
