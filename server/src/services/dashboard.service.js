import db from "../db/knex.js";

/**
 * Fetch dashboard summary counts
 */
export async function getDashboardSummary(userId) {
  // Fetch user activities (overfetching)
  const rows = await db("user_activities")
    .where({ user_id: userId });

  let completed = 0;
  let started = 0;

  // JS-side aggregation
  for (const row of rows) {
    if (row.status === "completed") {
      completed++;
    } else {
      started++;
    }
  }

  return {
    total: rows.length,
    completed,
    started
  };
}

/**
 * Fetch recent activities
 */
export async function getRecentActivities(userId) {
  // Fetch recent activity logs
  const logs = await db("activity_logs")
    .where({ user_id: userId })
    .orderBy("created_at", "desc")
    .limit(10);

  const results = [];

  for (const log of logs) {
    // N+1 pattern: fetch activity for each log
    const activity = await db("activities")
      .where({ id: log.activity_id })
      .first();

    results.push({
      activityId: activity.id,
      title: activity.title,
      action: log.action,
      metadata: log.metadata, // large JSON passed through
      timestamp: log.created_at
    });
  }

  return results;
}

/**
 * Fetch activity stats grouped by type
 */
export async function getActivityStats(userId) {
  // Fetch all user activities
  const rows = await db("user_activities")
    .where({ user_id: userId });

  const stats = {};

  for (const row of rows) {
    // Fetch activity type repeatedly
    const activity = await db("activities")
      .where({ id: row.activity_id })
      .first();

    if (!stats[activity.type]) {
      stats[activity.type] = {
        total: 0,
        completed: 0
      };
    }

    stats[activity.type].total++;

    if (row.status === "completed") {
      stats[activity.type].completed++;
    }
  }

  return stats;
}
