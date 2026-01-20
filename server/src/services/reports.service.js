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


// // Buggy code with console logs
// export async function recordDashboardView(userId, metadata = {}) {
//   const start = Date.now();
//   console.log("[analytics-write] inserting wide row");

//   await db("dashboard_views").insert({
//     user_id: userId,
//     viewed_at: new Date(),
//     user_agent: metadata.ua,
//     ip_address: metadata.ip,
//     raw_headers: JSON.stringify(metadata.headers),
//     session_dump: JSON.stringify(metadata.session),
//     debug_payload: JSON.stringify(metadata.debug)
//   });

//   console.log(
//     "[analytics-write] insert completed in",
//     Date.now() - start,
//     "ms"
//   );
// }

// // Fixed code with console logs
// export async function recordDashboardView(userId, metadata = {}) {
//   const start = Date.now();
//   console.log("[analytics-write] inserting lean row");

//   const [id] = await db("dashboard_views").insert({
//     user_id: userId,
//     viewed_at: new Date()
//   });

//   console.log(
//     "[analytics-write] core insert done in",
//     Date.now() - start,
//     "ms"
//   );

//   if (metadata && Object.keys(metadata).length) {
//     await db("dashboard_view_metadata").insert({
//       dashboard_view_id: id,
//       user_agent: metadata.ua,
//       ip_address: metadata.ip,
//       raw_headers: JSON.stringify(metadata.headers),
//       session_dump: JSON.stringify(metadata.session),
//       debug_payload: JSON.stringify(metadata.debug)
//     });

//     console.log(
//       "[analytics-write] metadata insert done in",
//       Date.now() - start,
//       "ms"
//     );
//   }
// }


// Fixed code without console logs
export async function recordDashboardView(userId, metadata = {}) {
  const [id] = await db("dashboard_views").insert({
    user_id: userId,
    viewed_at: new Date()
  });

  if (metadata && Object.keys(metadata).length) {
    await db("dashboard_view_metadata").insert({
      dashboard_view_id: id,
      user_agent: metadata.ua,
      ip_address: metadata.ip,
      raw_headers: JSON.stringify(metadata.headers),
      session_dump: JSON.stringify(metadata.session),
      debug_payload: JSON.stringify(metadata.debug)
    });
  }
}

export async function getDashboardViews(userId) {
  const rows = await db("dashboard_views")
    .where({ user_id: userId })
    .orderBy("viewed_at", "desc");
  return rows;
}