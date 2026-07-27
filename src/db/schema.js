const { serial, integer, pgTable, varchar } = require("drizzle-orm/pg-core");

const anggotaTable = pgTable("anggota", {
  id: serial("id").primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  nim: varchar("nim", { length: 255 }).notNull().unique(),
  umur: integer("umur").notNull(),
  jurusan: varchar("jurusan", { length: 255 }).notNull(),
});

module.exports = {
  anggotaTable,
};