const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "data-hub-mock-secret-do-not-use-in-production";
const MOCK_USER = { username: "admin", password: "password123" };

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }
  if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const token = jwt.sign({ username, role: "user" }, SECRET_KEY, { expiresIn: "1h" });
  return res.status(200).json({ success: true, message: "Login successful", token });
});

module.exports = router;