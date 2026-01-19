import db from "../db/knex.js";

/**
 * Fetch dashboard summary counts
 */
// export async function getDashboardSummary(userId) {
//   const rows = await db("user_activities")
//     .select("*")
//     .where({ user_id: userId });

//   let completed = 0;
//   let started = 0;

//   for (const row of rows) {
//     if (row.status === "completed") completed++;
//     else started++;
//   }

//   return {
//     total: rows.length,
//     completed,
//     started
//   };
// }

// Buggy Code with console logs to trace performance
// export async function getDashboardSummary(userId) {
//   const start = Date.now();
//   console.log("[dashboard][summary] js aggregation start");

//   const rows = await db("user_activities")
//     .select("status")
//     .where({ user_id: userId });

//   console.log(
//     "[dashboard][summary] rows fetched:",
//     rows.length,
//     "fetch time:",
//     Date.now() - start,
//     "ms"
//   );

//   let completed = 0;
//   let started = 0;

//   for (const row of rows) {
//     if (row.status === "completed") completed++;
//     else started++;
//   }

//   console.log(
//     "[dashboard][summary] js aggregation done in",
//     Date.now() - start,
//     "ms"
//   );

//   return {
//     total: rows.length,
//     completed,
//     started
//   };
// }


// // Fixed code with console logs
// export async function getDashboardSummary(userId) {
//   const start = Date.now();
//   console.log("[dashboard][summary] sql aggregation start");

//   const [{ total }] = await db("user_activities")
//     .where({ user_id: userId })
//     .count("* as total");

//   const [{ completed }] = await db("user_activities")
//     .where({ user_id: userId, status: "completed" })
//     .count("* as completed");

//   const [{ started }] = await db("user_activities")
//     .where({ user_id: userId, status: "started" })
//     .count("* as started");

//   console.log(
//     "[dashboard][summary] sql aggregation done in",
//     Date.now() - start,
//     "ms"
//   );

//   return {
//     total: Number(total),
//     completed: Number(completed),
//     started: Number(started)
//   };
// }

// // Fixed code without console logs
export async function getDashboardSummary(userId) {
  const [{ total }] = await db("user_activities")
    .where({ user_id: userId })
    .count("* as total");

  const [{ completed }] = await db("user_activities")
    .where({ user_id: userId, status: "completed" })
    .count("* as completed");

  const [{ started }] = await db("user_activities")
    .where({ user_id: userId, status: "started" })
    .count("* as started");

  return {
    total: Number(total),
    completed: Number(completed),
    started: Number(started)
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
