const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const port = 3001;
const userHandler = require("./routeHandler/userHandler");
const checkLogin = require("./middlewares/checkLogin");
//express app initialization
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(201).json({ wellcome: "Hello World!" });
});

//app routes
app.use("/user", userHandler);

//db connection
mongoose
  .connect("mongodb://localhost:27017/msc-project", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("db connected!"))
  .catch((err) => console.log(err));

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
