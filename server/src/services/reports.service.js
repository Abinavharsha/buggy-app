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

// export async function getDashboardViews(userId) {
//   const rows = await db("dashboard_views")
//     .where({ user_id: userId })
//     .orderBy("viewed_at", "desc");
//   return rows;
// }


// // Buggy code with console log
export async function getDashboardViews(userId) {
  const start = Date.now();
  console.log("[analytics] fetching dashboard views");

  const rows = await db("dashboard_views")
    .where({ user_id: userId })
    .orderBy("viewed_at", "desc");

  console.log(
    "[analytics] rows fetched:",
    rows.length,
    "time:",
    Date.now() - start,
    "ms"
  );

  return rows;
}


// // Fixed code without console log
// export async function getDashboardViews(
//   { userId, sinceDays = 30, limit = 100 } = {}
// ) {
//   const since = new Date(
//     Date.now() - sinceDays * 24 * 60 * 60 * 1000
//   );

//   return db("dashboard_views")
//     .where({ user_id: userId })
//     .andWhere("viewed_at", ">", since)
//     .orderBy("viewed_at", "desc")
//     .limit(limit);
// }


// // Fixed code with console log
// export async function getDashboardViews(
//   { userId, sinceDays = 30, limit = 100 } = {}
// ) {
//   const start = Date.now();
//   const since = new Date(
//     Date.now() - sinceDays * 24 * 60 * 60 * 1000
//   );

//   console.log(
//     "[analytics] scoped fetch start",
//     "userId:",
//     userId,
//     "sinceDays:",
//     sinceDays,
//     "limit:",
//     limit
//   );

//   const rows = await db("dashboard_views")
//     .where({ user_id: userId })
//     .andWhere("viewed_at", ">", since)
//     .orderBy("viewed_at", "desc")
//     .limit(limit);

//   console.log(
//     "[analytics] scoped rows fetched:",
//     rows.length,
//     "time:",
//     Date.now() - start,
//     "ms"
//   );

//   return rows;
// }