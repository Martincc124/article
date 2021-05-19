import express from "express";
import routes from "./src/routes/articleRoutes.js";
import markerroutes from "./src/routes/markerRoutes.js";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import jsonswebtoken from "jsonwebtoken";

const app = express();
const PORT = 4000;

// mongoose connection
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://martin:martinersej@cluster0.dqk3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// static files
app.use("/uploads", express.static("uploads"));

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonswebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);
markerroutes(app);

app.get("/", (req, res) => {
  res.send(`Server is running on Port: ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
