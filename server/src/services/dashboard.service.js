import db from "../db/knex.js";

/**
 * Fetch dashboard summary counts
 */
export async function getDashboardSummary(userId) {
  const rows = await db("user_activities")
    .where({ user_id: userId });

  let completed = 0;
  let started = 0;

  for (const row of rows) {
    if (row.status === "completed") completed++;
    else started++;
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
  const logs = await db("activity_logs")
    .where({ user_id: userId })
    .orderBy("created_at", "desc")
    .limit(50);

  const results = [];

  for (const log of logs) {
    const activity = await db("activities")
      .where({ id: log.activity_id })
      .first();

    results.push({
      activityId: activity.id,
      title: activity.title,
      action: log.action,
      metadata: log.metadata,
      timestamp: log.created_at
    });
  }

  return results;
}

/**
 * Fetch activity stats grouped by type
 */
export async function getActivityStats(userId) {
  const rows = await db("user_activities")
    .where({ user_id: userId });

  const stats = {};

  for (const row of rows) {
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

// Fix for the module

// import db from "../db/knex.js";

// /**
//  * Fetch dashboard summary counts (GLOBAL)
//  * FIX:
//  * - No userId dependency
//  * - No per-row looping
//  */
// export async function getDashboardSummary() {
//   const [{ total }] = await db("user_activities")
//     .count("* as total");

//   const [{ completed }] = await db("user_activities")
//     .where({ status: "completed" })
//     .count("* as completed");

//   const [{ started }] = await db("user_activities")
//     .where({ status: "started" })
//     .count("* as started");

//   return {
//     total: Number(total),
//     completed: Number(completed),
//     started: Number(started)
//   };
// }

// /**
//  * Fetch recent activities (GLOBAL)
//  * FIX:
//  * - No userId dependency
//  * - No per-row await inside controller
//  * - Still readable (no joins yet — those come later)
//  */
// export async function getRecentActivities() {
//   const logs = await db("activity_logs")
//     .orderBy("created_at", "desc")
//     .limit(50);

//   const activityIds = logs.map(l => l.activity_id);

//   const activities = await db("activities")
//     .whereIn("id", activityIds);

//   const activityMap = new Map(
//     activities.map(a => [a.id, a])
//   );

//   return logs.map(log => {
//     const activity = activityMap.get(log.activity_id);

//     return {
//       activityId: activity.id,
//       title: activity.title,
//       action: log.action,
//       metadata: log.metadata,
//       timestamp: log.created_at
//     };
//   });
// }

// /**
//  * Fetch activity stats grouped by type (GLOBAL)
//  * FIX:
//  * - No userId dependency
//  * - No per-row DB calls
//  */
// export async function getActivityStats() {
//   const rows = await db("user_activities")
//     .join("activities", "activities.id", "user_activities.activity_id")
//     .select(
//       "activities.type",
//       "user_activities.status"
//     );

//   const stats = {};

//   for (const row of rows) {
//     if (!stats[row.type]) {
//       stats[row.type] = {
//         total: 0,
//         completed: 0
//       };
//     }

//     stats[row.type].total++;

//     if (row.status === "completed") {
//       stats[row.type].completed++;
//     }
//   }

//   return stats;
// }
