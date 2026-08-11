const db = require("../config/db");
const { usersTable } = require("../models/schema");
const { eq } = require("drizzle-orm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 1. REGISTER
exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Validasi field
    if (!nama || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi!",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user ke database
    const [userBaru] = await db
      .insert(usersTable)
      .values({
        nama,
        email,
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
    // Email sudah terdaftar
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar!",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi field
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi!",
      });
    }

    // Cari user berdasarkan email
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah!",
      });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah!",
      });
    }

    // Terbitkan Token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nama: user.nama,
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};