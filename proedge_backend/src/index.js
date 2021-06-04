const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/routes");
const mongoose = require("mongoose");
const port = 8000 || process.env.PORT;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/v1", router);

app.get("/", (req, res, next) => {
  res.send("Welcome to Proedge Assignment");
});

mongoose
  .connect(
    "mongodb+srv://ganguly123:ganguly123@cluster0.ymbtt.mongodb.net/ganguly123?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log("Server running at  " + port);
    });
  })
  .catch((err) => console.log(err));
