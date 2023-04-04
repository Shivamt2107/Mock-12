const express = require("express");

const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
        res.send("Something wrong");
      } else {
        const user = new userModel({ name, email, password: hash });

        await user.save();

        res.send("user has been successfully register");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.find({ email: email });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "shivam");

          res.send({ msg: "Login Successfully", Token: token });
        } else {
          res.send("wrong credential");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});






module.exports={userRouter}
