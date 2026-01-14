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
// export async function getRecentActivities(userId) {
//   const logs = await db("activity_logs")
//     .where({ user_id: userId })
//     .orderBy("created_at", "desc")
//     .limit(50);

//   const results = [];

//   for (const log of logs) {
//     const activity = await db("activities")
//       .where({ id: log.activity_id })
//       .first();

//     results.push({
//       activityId: activity.id,
//       title: activity.title,
//       action: log.action,
//       metadata: log.metadata,
//       timestamp: log.created_at
//     });
//   }

//   return results;
// }

// Buggy code with console log
export async function getRecentActivities(userId) {
  const start = Date.now();


  const logs = await db("activity_logs")
    .where({ user_id: userId })
    .orderBy("created_at", "desc")
    .limit(50);


  console.log("[service][buggy] logs fetched in", Date.now() - start, "ms");


  const results = [];


  for (const log of logs) {
    const activityStart = Date.now();


    const activity = await db("activities")
      .where({ id: log.activity_id })
      .first();


    console.log(
      "[service][buggy] activity lookup took",
      Date.now() - activityStart,
      "ms"
    );


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

// Fixed code with console log
// export async function getRecentActivities(userId) {
//   const start = Date.now();
//   const logs = await db("activity_logs")
//     .where({ user_id: userId })
//     .orderBy("created_at", "desc")
//     .limit(50);

//   console.log(
//     "[service][fixed] logs fetched:",
//     logs.length,
//     "in",
//     Date.now() - start,
//     "ms"
//   );

//   const activityIds = logs.map(l => l.activity_id);

//   const activities = await db("activities")
//     .whereIn("id", activityIds);

//   console.log(
//     "[service][fixed] activities bulk fetched:",
//     activities.length,
//     "in",
//     Date.now() - start,
//     "ms"
//   );

//   const activityMap = new Map(
//     activities.map(a => [a.id, a])
//   );

//   const results = logs.map(log => {
//     const activity = activityMap.get(log.activity_id);

//     return {
//       activityId: activity.id,
//       title: activity.title,
//       action: log.action,
//       metadata: log.metadata,
//       timestamp: log.created_at
//     };
//   });

//   console.log(
//     "[service][fixed] total service time:",
//     Date.now() - start,
//     "ms"
//   );

//   return results;
// }

// Fixed code without console log
// export async function getRecentActivities(userId) {
//   const logs = await db("activity_logs")
//     .where({ user_id: userId })
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
