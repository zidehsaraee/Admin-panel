const express = require("express");
const OnlineShopDB = require("./../db/OnlineShop");

const adminsRouter = express.Router();

adminsRouter.get("/", (req, res) => {
  let adminToken = req.headers.authorization;

  let selectMainAdminQuery = `SELECT * FROM admins WHERE token = "${adminToken}"`;
  OnlineShopDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
