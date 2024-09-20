const express = require("express");
const OnlineShopDB = require("./../db/OnlineShop");

const offsRouter = express.Router();

offsRouter.get("/", (req, res) => {
  let selectAllOffers = `SELECT offs.id, offs.code, offs.percent, products.title as productID, admins.firstname as adminID, offs.date, offs.isActive From offs INNER JOIN products ON products.id = offs.productID INNER JOIN admins ON admins.id = offs.adminID`;
  OnlineShopDB.query(selectAllOffers, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

offsRouter.delete("/:offID", (req, res) => {
  let offID = req.params.offID;
  let deleteOffQuery = `DELETE FROM offs WHERE id=${offID}`;
  OnlineShopDB.query(deleteOffQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

offsRouter.put("/active-off/:offID/:isActive", (req, res) => {
  let offID = req.params.offID;
  let isActive = req.params.isActive;
  let activeOffsQuery = `UPDATE offs SET isActive=${isActive} WHERE id=${offID}`;
  OnlineShopDB.query(activeOffsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = offsRouter;
