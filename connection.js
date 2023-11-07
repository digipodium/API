const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect('mongodb+srv://mmm:mmm@cluster0.gvyon.mongodb.net/expressapi?retryWrites=true&w=majority')
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
