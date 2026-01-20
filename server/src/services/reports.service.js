// import db from "../db/knex.js";

// export async function getActivitySummaryReport() {
//   const activities = await db("activities").select("id", "type");
//   const participants = await db("user_activities").select("activity_id");

//   return { activities, participants };
// }



// // Buggy code with console log
// import db from "../db/knex.js";

// export async function getActivitySummaryReport() {
//   const start = Date.now();
//   console.log("[report] summary start");

//   const activities = await db("activities")
//     .select("id", "type");

//   console.log(
//     "[report] activities fetched:",
//     activities.length,
//     "time:",
//     Date.now() - start,
//     "ms"
//   );

//   const participants = await db("user_activities")
//     .select("activity_id");

//   console.log(
//     "[report] participants fetched:",
//     participants.length,
//     "time:",
//     Date.now() - start,
//     "ms"
//   );

//   return { activities, participants };
// }



// // Fixed code with console log
// import db from "../db/knex.js";

// export async function getActivitySummaryReport(
//   { page = 1, limit = 100 } = {}
// ) {
//   const offset = (page - 1) * limit;
//   const start = Date.now();

//   console.log(
//     "[report] pagination start",
//     "page:",
//     page,
//     "offset:",
//     offset
//   );

//   const activities = await db("activities")
//     .select("id", "type");

//   console.log(
//     "[report] activities fetched:",
//     activities.length,
//     "time:",
//     Date.now() - start,
//     "ms"
//   );

//   const participants = await db("user_activities")
//     .select("activity_id")
//     .limit(limit)
//     .offset(offset);

//   console.log(
//     "[report] participants page size:",
//     participants.length,
//     "time:",
//     Date.now() - start,
//     "ms"
//   );

//   return { activities, participants };
// }


// Fixed code without console logs
import db from "../db/knex.js";

export async function getActivitySummaryReport(
  { page = 1, limit = 100 } = {}
) {
  const offset = (page - 1) * limit;

  const activities = await db("activities")
    .select("id", "type");

  const participants = await db("user_activities")
    .select("activity_id")
    .limit(limit)
    .offset(offset);

  return { activities, participants };
}

