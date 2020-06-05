const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//Libraries

const app = express();
require("dotenv").config();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

//Database Setup

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful connection!");
  });

//Routes
app.use("/api/category", require("./routes/category"));
app.use("/api/videogame", require("./routes/videogame"));
app.use("/api/auth", require("./routes/auth"));

//Listen Port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server in port: ${port}`);
});
