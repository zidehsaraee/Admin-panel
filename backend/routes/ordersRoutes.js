const express = require("express");
const OnlineShopDB = require("./../db/OnlineShop");

const ordersRouter = express.Router();

ordersRouter.get("/", (req, res) => {
  let selectAllOrdersQuery = `SELECT orders.id, products.title as productID, users.firstname as UserID, orders.date, orders.hour, orders.price, orders.sale, orders.popularity, orders.count, orders.sale_count, orders.isActive FROM orders INNER JOIN products ON products.id = orders.productID INNER JOIN users ON users.id = orders.UserID`;
  OnlineShopDB.query(selectAllOrdersQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.delete("/:orderID", (req, res) => {
  let orderID = req.params.orderID;
  let deleteOrderQuery = `DELETE FROM orders WHERE id =${orderID}`;
  OnlineShopDB.query(deleteOrderQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.put("/active-order/:orderID", (req, res) => {
  orderID = req.params.orderID;
  let activeOrderQuery = `
  UPDATE orders SET 
  isActive=1 
  WHERE 
  id=${orderID}
  `;
  OnlineShopDB.query(activeOrderQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

ordersRouter.put("/reject-order/:orderID", (req, res) => {
  orderID = req.params.orderID;
  let activeOrderQuery = `
  UPDATE orders SET 
  isActive=0 
  WHERE 
  id=${orderID}
  `;
  OnlineShopDB.query(activeOrderQuery, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = ordersRouter;
