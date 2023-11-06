const { model, Schema, Types } = require("../connection");

module.exports = model(
  "links",
  new Schema({
    user: {type : Types.ObjectId, ref: "users"},
    logo: { type: String, default: 'logo_placeholder.png' },
    title: { type: String, required: true },
    description: { type: String },
    facebook: String,
    linkedin: String,
    youtube: String,
    instagram: String,
    github: String,
    createdAt: Date,
  })
);
