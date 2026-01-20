import db from "../db/knex.js";

/**
 * Fetch dashboard summary counts
 */
export async function getDashboardSummary(userId) {
  const rows = await db("user_activities")
    .select("*")
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

// /**
//  * Fetch activity stats grouped by type
//  */
// export async function getActivityStats(userId) {
//   const rows = await db("user_activities")
//     .where({ user_id: userId });

//   const stats = {};

//   for (const row of rows) {
//     const activity = await db("activities")
//       .where({ id: row.activity_id })
//       .first();

//     if (!stats[activity.type]) {
//       stats[activity.type] = {
//         total: 0,
//         completed: 0
//       };
//     }

//     stats[activity.type].total++;

//     if (row.status === "completed") {
//       stats[activity.type].completed++;
//     }
//   }

//   return stats;
// }

// // Buggy version with console log 
// export async function getActivityStats(userId) {
//   console.log("[db-buggy] start getActivityStats");

//   const rows = await db("user_activities")
//     .where({ user_id: userId });

//   console.log("[db-buggy] user_activities rows:", rows.length);

//   const stats = {};

//   for (const row of rows) {
//     console.log("[db-buggy] querying activity:", row.activity_id);

//     const activity = await db("activities")
//       .where({ id: row.activity_id })
//       .first();

//     if (!stats[activity.type]) {
//       stats[activity.type] = { total: 0, completed: 0 };
//     }

//     stats[activity.type].total++;

//     if (row.status === "completed") {
//       stats[activity.type].completed++;
//     }
//   }

//   return stats;
// }

// // Fixed version with console logs
// export async function getActivityStats(userId) {
//   console.log("[db-fixed] start getActivityStats");

//   const rows = await db("user_activities as ua")
//     .join("activities as a", "a.id", "ua.activity_id")
//     .select("a.type", "ua.status")
//     .where("ua.user_id", userId);

//   console.log("[db-fixed] rows fetched:", rows.length);

//   const stats = {};

//   for (const row of rows) {
//     if (!stats[row.type]) {
//       stats[row.type] = { total: 0, completed: 0 };
//     }

//     stats[row.type].total++;

//     if (row.status === "completed") {
//       stats[row.type].completed++;
//     }
//   }

//   return stats;
// }

// Fixed version without console logs
export async function getActivityStats(userId) {
  const rows = await db("user_activities as ua")
    .join("activities as a", "a.id", "ua.activity_id")
    .select("a.type", "ua.status")
    .where("ua.user_id", userId);

  const stats = {};

  for (const row of rows) {
    if (!stats[row.type]) {
      stats[row.type] = { total: 0, completed: 0 };
    }

    stats[row.type].total++;

    if (row.status === "completed") {
      stats[row.type].completed++;
    }
  }

  return stats;
}

