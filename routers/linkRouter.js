const router = require("express").Router();
const Model = require("../models/linkModel");

router.post("/add", (req, res) => {
  console.log(req.body);
  new Model(req.body)
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});


module.exports = router;
