const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });

    res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    console.error("Error -> ", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and Password should not be empty",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email is not registered!",
      });
    }

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(400).json({
        message: "Password is Incorrect!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/getAllUser", async (req, res) => {
  try {
      const users = await User.find().select(
          "name email createdAt updatedAt chatGroups active"
      );

      res.status(200).json(users);
  } catch (error) {
      console.error("Error -> ", error);
      res.status(400).json(error);
  }
});

router.get("/getAllChatGroupOfAUser/:userId", async (req, res) => {
  try {
      const { userId } = req.params;
      const userDetails = await User.findById({_id: userId}).populate("chatGroups");
      userDetails.password = "";

      res.status(200).json(userDetails);
  } catch (error) {
      console.error("Error -> ", error);
      res.status(400).json(error);
  }
});

module.exports = router;