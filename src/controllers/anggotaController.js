const db = require("../config/db");
const { anggotaTable } = require("../models/schema");
const { eq } = require("drizzle-orm");

// Fungsi validasi data anggota
const validasiAnggota = ({ nama, nim, umur, jurusan }) => {
  if (
    !nama ||
    !nim ||
    umur === undefined ||
    umur === null ||
    !jurusan
  ) {
    const error = new Error("Semua field harus diisi!");
    error.statusCode = 400;
    throw error;
  }

  if (typeof nama !== "string" || nama.trim().length < 3) {
    const error = new Error("Nama minimal berisi 3 karakter!");
    error.statusCode = 400;
    throw error;
  }

  if (typeof nim !== "string" || !/^\d+$/.test(nim)) {
    const error = new Error("NIM wajib berupa string angka!");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(Number(umur)) || Number(umur) < 15) {
    const error = new Error(
      "Umur wajib berupa angka dan minimal 15 tahun!"
    );
    error.statusCode = 400;
    throw error;
  }

  if (typeof jurusan !== "string" || !jurusan.trim()) {
    const error = new Error("Jurusan wajib berupa teks!");
    error.statusCode = 400;
    throw error;
  }

  return {
    nama: nama.trim(),
    nim,
    umur: Number(umur),
    jurusan: jurusan.trim(),
  };
};

// GET SEMUA ANGGOTA
exports.getAllAnggota = async (req, res, next) => {
  try {
    const data = await db.select().from(anggotaTable);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// TAMBAH ANGGOTA
exports.createAnggota = async (req, res, next) => {
  try {
    const dataAnggota = validasiAnggota(req.body);

    const [anggotaBaru] = await db
      .insert(anggotaTable)
      .values(dataAnggota)
      .returning();

    res.status(201).json({
      success: true,
      message: "Anggota berhasil ditambahkan",
      data: anggotaBaru,
    });
  } catch (error) {
    next(error);
  }
};

// EDIT ANGGOTA
exports.updateAnggota = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      const error = new Error("ID anggota tidak valid!");
      error.statusCode = 400;
      throw error;
    }

    const dataAnggota = validasiAnggota(req.body);

    const [anggotaDiperbarui] = await db
      .update(anggotaTable)
      .set(dataAnggota)
      .where(eq(anggotaTable.id, id))
      .returning();

    if (!anggotaDiperbarui) {
      const error = new Error("Anggota tidak ditemukan!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Anggota berhasil diperbarui",
      data: anggotaDiperbarui,
    });
  } catch (error) {
    next(error);
  }
};

// HAPUS ANGGOTA
exports.deleteAnggota = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      const error = new Error("ID anggota tidak valid!");
      error.statusCode = 400;
      throw error;
    }

    const [anggotaDihapus] = await db
      .delete(anggotaTable)
      .where(eq(anggotaTable.id, id))
      .returning();

    if (!anggotaDihapus) {
      const error = new Error("Anggota tidak ditemukan!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Anggota berhasil dihapus",
      data: anggotaDihapus,
    });
  } catch (error) {
    next(error);
  }
};