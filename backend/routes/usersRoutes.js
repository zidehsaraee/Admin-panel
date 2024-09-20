const express = require("express");
const OnlineShopDB = require("./../db/OnlineShop");

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  let selectAllUsersQuery = `SELECT * FROM users`;
  OnlineShopDB.query(selectAllUsersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.delete("/:userID", (req, res) => {
  let userID = req.params.userID;

  let deleteUserCommentsQuery = `DELETE FROM comments WHERE userID=${userID}`;
  OnlineShopDB.query(deleteUserCommentsQuery, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
  });

  let deleteUserOrdersQuery = `DELETE FROM orders WHERE userID=${userID}`;
  OnlineShopDB.query(deleteUserOrdersQuery, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
  });

  let deleteUserQuery = `DELETE FROM users WHERE id=${userID}`;
  OnlineShopDB.query(deleteUserQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

usersRouter.put("/:userID", (req, res) => {
  let userID = req.params.userID;
  let body = req.body;

  let updateUserQuery = `
  UPDATE users SET 
  firstname="${body.firstname}",
  lastname="${body.lastname}",
  username="${body.username}",
  password="${body.password}",
  phone="${body.phone}",
  email="${body.email}",
  city="${body.city}",
  address="${body.address}",
  score=${body.score},
  buy=${body.buy} 
  WHERE id=${userID}
  `;
  OnlineShopDB.query(updateUserQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = usersRouter;
