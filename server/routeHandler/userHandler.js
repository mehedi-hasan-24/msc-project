const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

//Sign up

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "Sign Up Successfull!",
    });
  } catch {
    res.status(500).json({
      message: "Sign Up Failed!",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        //generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1hr",
          }
        );

        res.status(200).json({
          acces_token: token,
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
  } catch {
    res.status(401).json({
      error: "Authentication Failded3!",
    });
  }
});

module.exports = router;
