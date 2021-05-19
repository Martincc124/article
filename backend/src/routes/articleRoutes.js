import {
  getArticles,
  getArticleWithId,
  updateArticle,
  addNewArticle,
  deleteArticle,
  getArticleWithName,
} from "../controllers/articleController.js";
import {
  login,
  register,
  loginRequired,
} from "../controllers/userControllers.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const routes = (app) => {
  app
    .route("/articles")
    .get((req, res, next) => {
      // middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getArticles)

    // POST endpoint
    .post(upload.single("articleImage"), addNewArticle);

  app
    .route("/articles/:name")
    // get speficic article by name
    .get(getArticleWithName);

  app
    .route("/api/articles/:articleId")
    // get specific contact
    .get(getArticleWithId)

    // put reques
    .put(upload.single("articleImage"), updateArticle)

    // delete request
    .delete(deleteArticle);

  // registration route
  app.route("/auth/register").post(register);

  // login route
  app.route("/login").post(login);
};

export default routes;
