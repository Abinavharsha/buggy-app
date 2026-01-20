import db from "../db/knex.js";

export async function getActivitySummaryReport() {
  const activities = await db("activities").select("id", "type");
  const participants = await db("user_activities").select("activity_id");

  return { activities, participants };
}

// export async function recordDashboardView(userId) {
//   await db("dashboard_views").insert({
//     user_id: userId,
//     viewed_at: new Date()
//   });
// }

export async function recordDashboardView(userId) {
  const start = Date.now();
  console.log("[dashboard-view] write start");

  await db("dashboard_views").insert({
    user_id: userId,
    viewed_at: new Date()
  });

  console.log(
    "[dashboard-view] write completed in",
    Date.now() - start,
    "ms"
  );
}