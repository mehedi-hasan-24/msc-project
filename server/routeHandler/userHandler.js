const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const keySchema = require("../schemas/keySchema");
const User = new mongoose.model("User", userSchema);
const Key = new mongoose.model("Key", keySchema);
const crypto = require("crypto");

//verify a user
router.post("/verify", async (req, res) => {
  try {
    const public_key = req.body.public_key;
    const signature = Buffer.from(req.body.signature, "hex");
    const data = req.body.data;
    const verify = crypto.createVerify("SHA256");
    verify.update(data);
    verify.end();
    res.status(200).json({
      isValid: verify.verify(public_key, signature),
    });
  } catch (e) {
    console.log("e.message", e.message);
  }
});

//Sign up

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      class_roll: req.body.class_roll,
      dept: req.body.dept,
      registration: req.body.registration,
      session: req.body.session,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "Sign Up Successfull!",
    });
  } catch (e) {
    console.log();
    res.status(500).json({
      message: e,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        //generate token
        const token = jwt.sign(
          {
            name: user[0].name,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1hr",
          }
        );

        // console.log(process.env.PUBLIC_KEY);
        // console.log(process.env.PRIVATE_KEY);
        // const key = await Key.find({});
        // console.log(key[0].private_key);

        //sign some data
        const sign = crypto.createSign("SHA256");
        //Data needed to be signed
        sign.update(
          user[0].name +
            user[0].email +
            user[0].class_roll +
            user[0].registration +
            user[0].session +
            user[0].dept
        );
        sign.end();

        const signature = sign
          .sign({
            key: process.env.PRIVATE_KEY,
            format: "pem",
            type: "pkcs8",
            passphrase: "joy bangla",
          })
          .toString("hex");

        res.status(200).json({
          acces_token: token,
          email: user[0].email,
          name: user[0].name,
          class_roll: user[0].class_roll,
          registration: user[0].registration,
          session: user[0].session,
          dept: user[0].dept,
          signature,
          public_key: process.env.PUBLIC_KEY,
          message: "log in successful!",
        });
      } else {
        res.status(401).json({
          error: "Authentication Failed1!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication Failded2!",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: "Authentication Failded3!",
    });
  }
});

module.exports = router;
