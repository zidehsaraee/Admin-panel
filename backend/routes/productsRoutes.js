const express = require("express");
const OnlineShopDB = require("./../db/OnlineShop");
const multer = require("multer");
const path = require("path");

const productsRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

productsRouter.get("/", (req, res) => {
  let selectAllProductsQuery = `SELECT * FROM products`;

  OnlineShopDB.query(selectAllProductsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.delete("/:productID", (req, res) => {
  let productID = req.params.productID;

  let deleteProductCommentsQuery = `DELETE FROM comments WHERE productID=${productID}`;
  OnlineShopDB.query(deleteProductCommentsQuery, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
  });

  let deleteProductOffsQuery = `DELETE FROM offs WHERE productID=${productID}`;
  OnlineShopDB.query(deleteProductOffsQuery, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
  });

  let deleteProductOrdersQuery = `DELETE FROM orders WHERE productID=${productID}`;
  OnlineShopDB.query(deleteProductOrdersQuery, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
  });

  let deleteProductQuery = `DELETE FROM products WHERE id = ${productID}`;
  OnlineShopDB.query(deleteProductQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});


productsRouter.put("/:productID", upload.single("image"), (req, res) => {
  let body = req.body;
  let productID = req.params.productID;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : body.img;

  let updateProductQuery = `UPDATE products SET 
     title="${body.title}", 
     price=${body.price}, 
     count=${body.count},
     img="${imagePath}", 
     popularity=${body.popularity}, 
     sale=${body.sale},
     colors=${body.colors} 
     WHERE id=${productID}`;

  OnlineShopDB.query(updateProductQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});


productsRouter.post("/", upload.single("image"), (req, res) => {
  let body = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : body.img;

  let addNewProductQuery = `INSERT INTO products (title, price, count, img, popularity, sale, colors)
     VALUES ("${body.title}", ${body.price}, ${body.count}, "${imagePath}", 
     ${body.popularity}, ${body.sale}, ${body.colors})`;

  OnlineShopDB.query(addNewProductQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = productsRouter;
