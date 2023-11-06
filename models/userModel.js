const { model, Schema, Types } = require("../connection");

module.exports = model(
  "users",
  new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
  })
);
