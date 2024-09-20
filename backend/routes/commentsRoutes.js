const express = require("express");
const OnlineShopDB = require("./../db/OnlineShop");

const commentsRouter = express.Router();

commentsRouter.get("/", (req, res) => {
  let selectAllCommentsQuery = `SELECT comments.id, comments.body, comments.date, comments.hour, comments.isAccept, users.firstname as userID, products.title as productID FROM comments INNER JOIN users ON users.id = comments.userID INNER JOIN products ON products.id = comments.productID`;
  OnlineShopDB.query(selectAllCommentsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.delete("/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let deleteCommentQuery = `DELETE FROM comments WHERE ID=${commentID}`;
  OnlineShopDB.query(deleteCommentQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.put("/:commentID", (req, res) => {
  let body = req.body;
  let commentID = req.params.commentID;
  let updateCommentQuery = `UPDATE comments SET body="${body.body}" WHERE id=${commentID}`;
  OnlineShopDB.query(updateCommentQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

commentsRouter.post("/accept/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let acceptComment = `UPDATE comments SET isAccept=1 WHERE id=${commentID}`;
  OnlineShopDB.query(acceptComment, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/reject/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let rejectComment = `UPDATE comments SET isAccept=0 WHERE id=${commentID}`;
  OnlineShopDB.query(rejectComment, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

commentsRouter.post("/response/:commentID", (req, res) => {
  let commentID = req.params.commentID;
  let body = req.body;
  let responseComment = `
  INSERT INTO comments
  VALUES (
    NULL,
    "${body.body}",
    "14.01/23",
    "17:00",
    6,
    24,
    0,
    1,
    ${commentID}    
  )`;
  OnlineShopDB.query(responseComment, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = commentsRouter;
