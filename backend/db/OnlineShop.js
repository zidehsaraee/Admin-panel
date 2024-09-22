require("dotenv").config();
const mysql = require("mysql2");

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3306/${process.env.MYSQL_DATABASE}`;
const connection = mysql.createConnection(urlDB);

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

module.exports = connection;
