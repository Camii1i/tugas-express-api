const express = require("express");
const router = express.Router();

const anggotaController = require("../controllers/anggotaController");
const verifyToken = require("../middlewares/authMiddleware");

// Public Route (Bisa diakses tanpa login)
router.get("/", anggotaController.getAllAnggota);

// Protected Route (Wajib menyertakan Bearer Token)
router.post("/", verifyToken, anggotaController.createAnggota);
router.put("/:id", verifyToken, anggotaController.updateAnggota);
router.delete("/:id", verifyToken, anggotaController.deleteAnggota);

module.exports = router;