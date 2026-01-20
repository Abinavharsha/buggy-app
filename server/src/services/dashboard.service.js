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

/**
 * BAD: Over-scoped transaction
 * Holds locks while application logic runs
 */
// export async function markUserActivitiesProcessed(userId) {
//   return db.transaction(async trx => {
//     const rows = await trx("user_activities")
//       .where({ user_id: userId });

//     // Application-side work inside transaction
//     for (const row of rows) {
//       await new Promise(res => setTimeout(res, 2));
//     }

//     await trx("user_activities")
//       .where({ user_id: userId })
//       .update({ status: "processed" });

//     return { updated: rows.length };
//   });
// }

/**
 * BAD: Over-scoped transaction (with logs)
 */
// export async function markUserActivitiesProcessed(userId) {
//   console.log("[tx][buggy] starting transaction");

//   return db.transaction(async trx => {
//     console.log("[tx][buggy] transaction opened");

//     const rows = await trx("user_activities")
//       .where({ user_id: userId });

//     console.log("[tx][buggy] rows fetched:", rows.length);

//     // Application-side work inside transaction
//     for (const row of rows) {
//       await new Promise(res => setTimeout(res, 2));
//     }

//     await trx("user_activities")
//       .where({ user_id: userId })
//       .update({ status: "processed" });

//     console.log("[tx][buggy] update committed");

//     return { updated: rows.length };
//   });
// }


/**
 * GOOD: Narrow transaction scope (with logs)
 */
// export async function markUserActivitiesProcessed(userId) {
//   console.log("[tx][fixed] fetching rows outside transaction");

//   const rows = await db("user_activities")
//     .where({ user_id: userId });

//   console.log("[tx][fixed] rows fetched:", rows.length);

//   // Application-side work OUTSIDE transaction
//   for (const row of rows) {
//     await new Promise(res => setTimeout(res, 2));
//   }

//   console.log("[tx][fixed] starting transaction");

//   await db.transaction(async trx => {
//     await trx("user_activities")
//       .where({ user_id: userId })
//       .update({ status: "processed" });

//     console.log("[tx][fixed] update committed");
//   });

//   return { updated: rows.length };
// }



/**
 * GOOD: Narrow transaction scope
 */
export async function markUserActivitiesProcessed(userId) {
  const rows = await db("user_activities")
    .where({ user_id: userId });

  // Application-side work outside transaction
  for (const row of rows) {
    await new Promise(res => setTimeout(res, 2));
  }

  await db.transaction(async trx => {
    await trx("user_activities")
      .where({ user_id: userId })
      .update({ status: "processed" });
  });

  return { updated: rows.length };
}
