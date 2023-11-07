const mongoose = require("mongoose");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
