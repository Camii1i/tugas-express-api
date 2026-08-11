const db = require("../config/db");
const { anggotaTable } = require("../models/schema");

// GET ALL ANGGOTA
exports.getAllAnggota = async (req, res) => {
  try {
    const data = await db.select().from(anggotaTable);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE ANGGOTA
exports.createAnggota = async (req, res) => {
  try {
    const { nama, nim, umur, jurusan } = req.body;

    // Validasi field
    if (!nama || !nim || !umur || !jurusan) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi!",
      });
    }

    // Tambahkan anggota
    const [anggotaBaru] = await db
      .insert(anggotaTable)
      .values({
        nama,
        nim,
        umur,
        jurusan,
      })
      .returning();

    res.status(201).json({
      success: true,
      message: "Anggota berhasil ditambahkan",
      data: anggotaBaru,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};