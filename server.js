const express = require("express");
const requestLogger = require("./middleware/logger");
const blogRoutes = require("./routes/blog.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to The Data Hub API",
    status: "Server is running",
  });
});

app.use("/api/posts", blogRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 The Data Hub server is running on http://localhost:${PORT}`);
});
module.exports = app;