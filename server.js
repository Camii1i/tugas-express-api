const express = require("express");
const app = express();

app.use(express.json());

const mahasiswa = [
    {
        nim: "001",
        nama: "Andi",
        jurusan: "Informatika"
    },
    {
        nim: "002",
        nama: "Budi",
        jurusan: "Sistem Informasi"
    },
    {
        nim: "003",
        nama: "Citra",
        jurusan: "Teknik Komputer"
    }
];

// GET /mahasiswa
app.get("/mahasiswa", (req, res) => {
    res.json(mahasiswa);
});

// GET /mahasiswa/:nim
app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim;

    const data = mahasiswa.find(m => m.nim === nim);

    if (!data) {
        return res.json({
            message: "Mahasiswa tidak ditemukan"
        });
    }

    res.json(data);
});

// POST /mahasiswa
app.post("/mahasiswa", (req, res) => {
    const { nama, nim } = req.body;

    res.json({
        message: `Berhasil menambahkan mahasiswa baru bernama ${nama}`
    });
});

app.listen(8080, () => {
    console.log("Server berjalan di port 8080");
});