import db from "./knex.js";
import { seedHeavy } from "./seed-heavy.js";

let initialized = false;

/**
 * Ensures migrations + heavy seed
 * run once per Vercel instance
 */
export async function initDb() {
  if (initialized) {
    return;
  }

  try {
    console.log("[db] running migrations...");
    await db.migrate.latest();
    console.log("[db] migrations complete");

    console.log("[db] running heavy seed...");
    await seedHeavy();
    console.log("[db] heavy seed complete");

    initialized = true;
  } catch (err) {
    console.error("[db] init failed", err);
    throw err;
  }
}
