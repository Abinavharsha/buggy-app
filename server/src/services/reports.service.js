import db from "../db/knex.js";

export async function getActivitySummaryReport() {
  const rows = await db("activities")
    .select("type")
    .count("* as count")
    .groupBy("type");

  return rows;
}
