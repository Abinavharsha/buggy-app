import knex from "knex";
import path from "path";
import { fileURLToPath } from "url";

// Needed because we are using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite database file path
const dbFilePath = path.join(__dirname, "../../data/insightboard.db");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: dbFilePath
  },
  useNullAsDefault: true
});

export default db;
