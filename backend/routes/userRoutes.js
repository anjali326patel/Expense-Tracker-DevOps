const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  console.log("REQ BODY:", req.body); // 🔥 DEBUG

  const { name, email, password } = req.body;

  try {
    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // ❗ IMPORTANT: REMOVE manual hashing (you already hash in model)
    const user = new User({
      name,
      email,
      password, // model will hash this
    });

    await user.save();

    res.status(201).json({ message: "Successfully Registered" });
  } catch (error) {
    console.log("REGISTER ERROR:", error); // 🔥 FULL ERROR
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  console.log("LOGIN BODY:", req.body); // 🔥 DEBUG

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("JWT SECRET MISSING ❌");
      return res.status(500).json({ message: "JWT not configured" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      name: user.name,
      budget: user.budget,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

/* ================= UPDATE BUDGET ================= */
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
    console.log("BUDGET ERROR:", error);
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
});

module.exports = router;