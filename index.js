require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const route = require("./routes/route");
const db = require("./config/db");
app.use(cors());
app.use(express.json());
app.use(route);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(port, () => {
  console.log("server running on port:", port);
});
