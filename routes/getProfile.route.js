const express = require("express");

const getProfile = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");


getProfile.get("/:id", async (req, res) => {
  const id = req.params.id;


  try {
    const user = await userModel.findOne({ _id: id });

    if (user) {
      res.send(user);
    } else {
      res.send("Invalid user");
    }
  } catch (err) {
    console.log(err);
    res.send({ err: err });
  }
});

module.exports={getProfile}
