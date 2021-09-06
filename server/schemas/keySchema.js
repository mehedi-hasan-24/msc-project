const mongoose = require("mongoose");

const keySchema = mongoose.Schema({
  public_key: {
    type: String,
    required: true,
  },
  private_key: {
    type: String,
    required: true,
  },
});

module.exports = keySchema;
