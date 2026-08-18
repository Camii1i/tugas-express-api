// Menangani route yang tidak ditemukan
const notFoundHandler = (req, res, next) => {
  const error = new Error(
    `Route ${req.method} ${req.originalUrl} tidak ditemukan`
  );

  error.statusCode = 404;
  next(error);
};

// Menangani seluruh error aplikasi
const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Terjadi kesalahan pada server",
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};