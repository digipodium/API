const mongoose = require("mongoose");
// console.log(process.env.NODE_ENV !== 'production');
// if (process.env.NODE_ENV !== 'production') {
// }
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    // console.log(result);
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;
