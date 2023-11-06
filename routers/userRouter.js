const router = require("express").Router();
const Model = require("../models/userModel");

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

router.post("/authenticate", (req, res) => {
  console.log(req.body);
  Model.findOne(req.body)
    .then((result) => {
      if(result) res.status(200).json(result);
      else res.status(401).json({message : 'Invalid Email or Password!'})
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
