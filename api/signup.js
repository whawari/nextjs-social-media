const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const FollowerModel = require("../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    if (username.length < 1) {
      return res.status(401).send("Invalid");
    }

    if (!regexUserName.test(username)) {
      return res.status(401).send("Invalid");
    }

    const user = await UserModel.findOne({
      username: username.toLocaleLowerCase(),
    });

    if (user) {
      return res.status(401).send("Username already exists");
    }

    return res.status(200).send("Available");
  } catch (error) {
    console.error(error);

    return res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    bio,
    facebook,
    youtube,
    twitter,
    instagram,
  } = req.body.user;

  if (!isEmail(email)) {
    return res.status(401).send("Invalid Email");
  }

  if (password.length < 6) {
    return res.status(401).send("Password must be at least 6 characters");
  }

  try {
    let user;
    user = await UserModel.findOne({ email: email.toLocaleLowerCase() });

    if (user) {
      return res.status(401).send("Username already registered");
    }

    user = new UserModel({
      name,
      email: email.toLocaleLowerCase(),
      username: username.toLocaleLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });

    user.password = await bcrypt.hash(password, 10);

    await user.save();
  } catch (error) {
    console.error(error);

    return res.status(500).send("Server error");
  }
});

module.exports = router;
