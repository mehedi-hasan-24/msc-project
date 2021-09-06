const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jws = require("jws");
const crypto = require("crypto");
const port = 3001;
const userHandler = require("./routeHandler/userHandler");
const checkLogin = require("./middlewares/checkLogin");
//express app initialization
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // const signature = jws.sign({
  //   header: { alg: "ES512" },
  //   payload: "h. jon benjamin",
  //   secret: "has a van",
  // });
  // console.log(jws.verify(signature, "ES512", "has a van"));

  // const alice = crypto.createDiffieHellman(2048);
  // const alice = crypto.createDiffieHellman(200);
  // const aliceKey = alice.generateKeys();
  // console.log(aliceKey.toString());

  // console.log(jws.decode(signature));
  res.status(201).json({ wellcome: aliceKey.toString("base64") });
});

//app routes
app.use("/user", userHandler);

//db connection
mongoose
  .connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("db connected!"))
  .catch((err) => console.log(err));

//default error handler
function errorHandler(err, req, res, next) {
  console.log(err);
  if (res.headerSent) {
    console.log("err 33");
    return next(err);
  }

  console.log("err 37");
  res.status(504).json({ error: "err protected route" });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
