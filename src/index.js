const express = require("express");
const db = require("./db");
const { anggotaTable } = require("./db/schema");
const { eq } = require("drizzle-orm");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware agar server dapat membaca JSON
app.use(express.json());

// =========================
// 1. GET
// =========================
app.get("/api/anggota", async (req, res) => {
  try {
    const dataAnggota = await db.select().from(anggotaTable);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data anggota perpustakaan",
      data: dataAnggota,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// =========================
// 2. POST
// =========================
app.post("/api/anggota", async (req, res) => {
  try {
    const { nama, nim, umur, jurusan } = req.body;

    // Validasi
    if (!nama || !nim || !umur || !jurusan) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi!",
      });
    }

    const dataBaru = await db
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
      message: "Data anggota berhasil ditambahkan",
      data: dataBaru,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// =========================
// 3. UPDATE
// =========================
app.put("/api/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, nim, umur, jurusan } = req.body;

    const dataUpdate = await db
      .update(anggotaTable)
      .set({
        nama,
        nim,
        umur,
        jurusan,
      })
      .where(eq(anggotaTable.id, id))
      .returning();

    if (dataUpdate.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data anggota tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data anggota berhasil diperbarui",
      data: dataUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// =========================
// 4. DELETE
// =========================
app.delete("/api/anggota/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const dataDelete = await db
      .delete(anggotaTable)
      .where(eq(anggotaTable.id, id))
      .returning();

    if (dataDelete.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data anggota tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data anggota berhasil dihapus",
      data: dataDelete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});