const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
  	name,
  	email,
  	password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "Successfully Registered" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const name = user.name;
    const budget = user.budget;
    res.json({ token, name, budget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

router.put("/budget", auth, async (req, res) => {
  const { budget } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.budget = budget;
    await user.save();
    res.json({ budget: user.budget });
  } catch (error) {
    console.error("Budget Update Error: ", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;
