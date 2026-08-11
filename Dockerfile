# 1. Gunakan Base Image resmi Node.js
FROM node:20-alpine


# 2. Tentukan working directory di dalam container
WORKDIR /app


# 3. Salin file manifes package
COPY package*.json ./


# 4. Install seluruh pustaka/dependencies
RUN npm install


# 5. Salin seluruh sisa kode sumber ke dalam container
COPY . .


# 6. Informasi port yang digunakan aplikasi
EXPOSE 3000


# 7. Perintah utama untuk menjalankan aplikasi
CMD ["node", "server.js"]
