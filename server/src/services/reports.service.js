import db from "../db/knex.js";

export async function getActivitySummaryReport() {
  const activities = await db("activities").select("id", "type");
  const participants = await db("user_activities").select("activity_id");

  return { activities, participants };
}

export async function recordDashboardView(userId) {
  await db("dashboard_views").insert({
    user_id: userId,
    viewed_at: new Date()
  });
}

export async function getDashboardViews(userId) {
  const rows = await db("dashboard_views")
    .where({ user_id: userId })
    .orderBy("viewed_at", "desc");
  return rows;
}