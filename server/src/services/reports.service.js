import db from "../db/knex.js";

/**
 * Export activities report
 */
export async function exportActivitiesReport({ from, to }) {
  let query = db("user_activities");

  if (from) {
    query = query.where("created_at", ">=", from);
  }

  if (to) {
    query = query.where("created_at", "<=", to);
  }

  // Fetch ALL matching rows (intentional)
  const rows = await query.orderBy("created_at", "desc");

  const results = [];

  for (const row of rows) {
    // Fetch user (N+1)
    const user = await db("users")
      .where({ id: row.user_id })
      .first();

    // Fetch activity (N+1)
    const activity = await db("activities")
      .where({ id: row.activity_id })
      .first();

    results.push({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      activityId: activity.id,
      activityTitle: activity.title,
      activityType: activity.type,
      status: row.status,
      score: row.score,
      completedAt: row.completed_at,
      createdAt: row.created_at
    });
  }

  return results;
}
