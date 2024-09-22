const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//create the Database
connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  (err, result) => {
    if (err) throw err;
    console.log(`Database '${process.env.DB_NAME}' crated or already exists.`);

    //Switch to the database and create the tables
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      const tables = [
        `CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        count INT NOT NULL,
        img VARCHAR(255) NOT NULL,
        popularity INT NOT NULL,
        sale INT NOT NULL,
        colors INT NOT NULL
      );`,

        `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        score INT NOT NULL,
        buy INT NOT NULL
      );`,

        `CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        body VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        hour VARCHAR(255) NOT NULL,
        userID INT,
        productID INT,
        isAccept INT DEFAULT 0,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (productID) REFERENCES products(id)
      );`,

        `CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        productID INT,
        userID INT,
        date VARCHAR(255) NOT NULL,
        hour VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        sale INT NOT NULL,
        popularity INT NOT NULL,
        count INT NOT NULL,
        sale_count INT NOT NULL,
        isActive INT DEFAULT 0,
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (productID) REFERENCES products(id)
      );`,
      ];

      tables.forEach((query) => {
        connection.query(query, (err, result) => {
          if (err) throw err;
          console.log("Tables created successfully!");
        });
      });
      connection.end();
    });
  }
);
