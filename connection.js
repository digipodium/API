const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
