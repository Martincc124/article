import mongoose from "mongoose";
import { ArticleSchema } from "../models/articleModel.js";

const Article = mongoose.model("Article", ArticleSchema);

export const addNewArticle = (req, res) => {
  let newArticle = new Article({
    name: req.body.name,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    articleImage: req.file.path,
  });

  newArticle.save((err, article) => {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

export const getArticles = (req, res) => {
  Article.find({}, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

export const getArticleWithName = (req, res) => {
  Article.findOne({ name: req.params.name }, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

export const getArticleWithId = (req, res) => {
  Article.findById(req.params.articleId, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

export const updateArticle = (req, res) => {
  Article.findOneAndUpdate(
    { _id: req.params.articleId },
    {
      name: req.body.name,
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      articleImage: req.file.path,
    },
    { new: true },
    (err, article) => {
      if (err) {
        res.send(err);
      }
      res.json(article);
    }
  );
};

export const deleteArticle = (req, res) => {
  Article.remove({ _id: req.params.articleId }, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Successfully deleted article" });
  });
};

// upvote not used for now
// export const upvoteArticle = (req, res) => {
//   Article.findOneAndUpdate(
//     { name: req.params.name },
//     {
//       $inc: { upvotes: 1 },
//     },
//     { new: true, upsert: true },
//     (err, article) => {
//       if (err) {
//         res.send(err);
//       }
//       res.json(article);
//     }
//   );
// };

// comment functioon not used for now
// export const commentArticle = (req, res) => {
//   Article.findOneAndUpdate(
//     { name: req.params.name },
//     {
//       $push: {
//         comments: {
//           text: req.body.text,
//           commentUserName: req.body.commentUserName,
//         },
//       },
//     },
//     { new: true, useFindAndModify: false },
//     (err, article) => {
//       if (err) {
//         res.send(err);
//       }
//       res.json(article);
//     }
//   );
// };
