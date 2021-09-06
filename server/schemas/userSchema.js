const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class_roll: {
    type: Number,
    required: true,
  },
  registration: {
    type: Number,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;
