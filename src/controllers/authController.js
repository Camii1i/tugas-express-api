const db = require("../config/db");
const { usersTable } = require("../models/schema");
const { eq } = require("drizzle-orm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      const error = new Error("Semua field harus diisi!");
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const [userBaru] = await db
      .insert(usersTable)
      .values({
        nama: nama.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      })
      .returning({
        id: usersTable.id,
        nama: usersTable.nama,
        email: usersTable.email,
      });

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil!",
      data: userBaru,
    });
  } catch (error) {
    // PostgreSQL unique violation
    if (error.code === "23505") {
      error.statusCode = 409;
      error.message = "Email sudah terdaftar!";
    }

    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email dan password wajib diisi!");
      error.statusCode = 400;
      throw error;
    }

    // Cari user berdasarkan email
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.trim().toLowerCase()));

    if (!user) {
      const error = new Error("Email atau password salah!");
      error.statusCode = 401;
      throw error;
    }

    // Bandingkan password
    const passwordCocok = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCocok) {
      const error = new Error("Email atau password salah!");
      error.statusCode = 401;
      throw error;
    }

    // Membuat token JWT
    const token = jwt.sign(
      {
        id: user.id,
        nama: user.nama,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login berhasil!",
      token,
    });
  } catch (error) {
    next(error);
  }
};  