const express = require("express");
const cors = require("cors");
const path = require('path');
const history = require('express-history-api-fallback');

const userRouter = require("./routers/userRouter");
const codeRouter = require('./routers/codeRouter');
const utilRouter = require('./routers/utils');

const app = express();

require("dotenv").config();
const root = path.join(__dirname, 'public');

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());

app.use("/api/user", userRouter);
app.use('/api/code', codeRouter);   
app.use('/api/util', utilRouter);

app.use('/api/archives', express.static('./archives'));
app.use(express.static("./static/uploads"));
app.use(express.static("./public"));
// console.log(root);
app.get("/api", (req, res) => {
  res.send("API Response");
});
app.use('*',history('index.html', { root }));


app.listen(process.env.PORT, () => {
  console.info("Server Started>>");
});
