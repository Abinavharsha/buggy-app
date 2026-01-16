import db from "../db/knex.js";

export async function getActivitySummaryReport() {
  const activities = await db("activities").select("id", "type");
  const participants = await db("user_activities").select("activity_id");

  return { activities, participants };
}
