## Author

**Nama** : Novry Nanda Kurniaputra  
**NIM**  : 2410501123
Tugas Mentoring Class Web Development

# API Data Mahasiswa

API sederhana untuk mengelola data mahasiswa menggunakan **Express.js**.  
Dibuat sebagai tugas Mentoring Class Web Development.

---

## Tools

- Node.js
- Express.js
- Git & GitHub

---

## Instalasi & Menjalankan

```bash
# Clone repository
git clone https://github.com/Camii1i/tugas-express-api

# Masuk ke folder proyek
cd tugas-express-api

# Install dependency
npm install

# Jalankan server
node server.js
```

Server berjalan di: `http://localhost:8080`

---

## Endpoint

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/mahasiswa` | Ambil semua data mahasiswa |
| GET | `/mahasiswa/:nim` | Ambil mahasiswa berdasarkan NIM |
| POST | `/mahasiswa` | Tambah mahasiswa baru |

### GET `/mahasiswa`
```json
[
  { "nim": "001", "nama": "Andi", "jurusan": "Informatika" },
  { "nim": "002", "nama": "Budi", "jurusan": "Sistem Informasi" }
]
```

### GET `/mahasiswa/001`
```json
{ "nim": "001", "nama": "Andi", "jurusan": "Informatika" }
```

### POST `/mahasiswa`
**Body:**
```json
{ "nim": "004", "nama": "Rina" }
```
**Response:**
```json
{ "message": "Berhasil menambahkan mahasiswa baru bernama Rina" }
```

---

## Struktur Folder

```
project-folder/
├── server.js
├── package.json
└── README.md
```

---