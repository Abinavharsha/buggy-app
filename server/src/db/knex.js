import knex from "knex";
import path from "path";
import { fileURLToPath } from "url";

// ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB file path
const dbFilePath =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "insightboard.db")
    : path.join(__dirname, "../../data/insightboard.db");

console.log("[db] Using SQLite DB at:", dbFilePath);

// 🔑 MIGRATIONS DIRECTORY (THIS FIXES THE ERROR)
const migrationsDir = path.join(__dirname, "migrations");

console.log("[db] Using migrations from:", migrationsDir);

const db = knex({
  client: "sqlite3",
  connection: {
    filename: dbFilePath
  },
  useNullAsDefault: true,

  migrations: {
    directory: migrationsDir
  }
});

export default db;
