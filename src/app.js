const express = require("express");

const authRoutes = require("./routes/authRoutes");
const anggotaRoutes = require("./routes/anggotaRoutes");

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Mounting Routes
app.use("/api/auth", authRoutes);
app.use("/api/anggota", anggotaRoutes);

module.exports = app;