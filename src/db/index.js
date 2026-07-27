const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");

const pool = new Pool({
  user: "Novry",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "db_perpustakaan_upnvj",
});

const db = drizzle({
  client: pool
});

module.exports = db;