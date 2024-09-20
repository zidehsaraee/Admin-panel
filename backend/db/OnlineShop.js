const mysql = require("mysql");

const OnlineShopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_panel",
});

module.exports = OnlineShopDB;
