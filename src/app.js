const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const anggotaRoutes = require("./routes/anggotaRoutes");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/anggota", anggotaRoutes);

// Harus diletakkan paling bawah setelah semua route
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;