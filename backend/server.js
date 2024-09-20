const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const productsRouter = require("./routes/productsRoutes");
const commentsRouter = require("./routes/commentsRoutes");
const usersRouter = require("./routes/usersRoutes");
const ordersRuter = require("./routes/ordersRoutes");
const adminsRouter = require("./routes/adminsRouts");
const offsRouter = require("./routes/offsRoutes");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const PORT = 5000;

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRuter);
app.use("/api/admins", adminsRouter);
app.use("/api/offs", offsRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/products", upload.single("image"), productsRouter);

app.listen(PORT, console.log("server is running newDashboard on port 5000"));
