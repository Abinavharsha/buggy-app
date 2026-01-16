import db from "../db/knex.js";

/**
 * Fetch paginated users
 */
// export async function getUsers({ page, limit, status }) {
//   let query = db("users");

//   if (status) {
//     query = query.where({ status });
//   }

//   // OFFSET pagination (intentional)
//   const rows = await query
//     .offset((page - 1) * limit)
//     .limit(limit);

//   // Attach derived data per user
//   const result = [];

//   for (const user of rows) {
//     // Fetch activities count per user (N+1)
//     const activities = await db("user_activities")
//       .where({ user_id: user.id });

//     result.push({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       status: user.status,
//       preferences: user.preferences,
//       activityCount: activities.length
//     });
//   }

//   return result;
// }

// Buggy code with Console Log
export async function getUsers() {
  const start = Date.now();

  const users = await db("users");

  console.log("[service] users fetched:", users.length);

  const result = [];

  for (const user of users) {
    const activities = await db("user_activities")
      .where({ user_id: user.id });

    result.push({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      preferences: user.preferences,
      activityCount: activities.length
    });
  }

  console.log(
    "[service] response object built in",
    Date.now() - start,
    "ms"
  );

  return result;
}

// // Fixed code with console log
// export async function getUsers() {
//   const start = Date.now();

//   const users = await db("users");
//   const activityCounts = await db("user_activities")
//     .select("user_id")
//     .count("* as count")
//     .groupBy("user_id");

//   console.log(
//     "[service][fixed] rows:",
//     users.length,
//     "built in",
//     Date.now() - start,
//     "ms"
//   );

//   const activityMap = new Map(
//     activityCounts.map(a => [a.user_id, a.count])
//   );

//   const result = users.map(u => ({
//     id: u.id,
//     name: u.name,
//     email: u.email,
//     role: u.role,
//     activityCount: activityMap.get(u.id) || 0
//   }));

//   console.log(
//     "[service][fixed] payload size reduced"
//   );

//   return result;
// }

// // Fixed code without console log
// export async function getUsers() {
//   const users = await db("users");

//   const activityCounts = await db("user_activities")
//     .select("user_id")
//     .count("* as count")
//     .groupBy("user_id");

//   const activityMap = new Map(
//     activityCounts.map(a => [a.user_id, a.count])
//   );

//   return users.map(u => ({
//     id: u.id,
//     name: u.name,
//     email: u.email,
//     role: u.role,
//     activityCount: activityMap.get(u.id) || 0
//   }));
// }



/**
 * Fetch single user
 */
export async function getUserById(userId) {
  // Fetch full row (overfetching)
  const user = await db("users")
    .where({ id: userId })
    .first();

  return user;
}

/**
 * Fetch user's activities
 */
export async function getUserActivities(userId) {
  // Fetch all activities for the user
  const rows = await db("user_activities")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");

  const results = [];

  for (const row of rows) {
    // Fetch activity details per row (N+1 again)
    const activity = await db("activities")
      .where({ id: row.activity_id })
      .first();

    results.push({
      activityId: activity.id,
      title: activity.title,
      type: activity.type,
      status: row.status,
      score: row.score,
      completedAt: row.completed_at
    });
  }

  return results;
}


export async function countUsers({ status }) {
  let query = db("users");

  if (status) {
    query = query.where({ status });
  }

  const [{ count }] = await query.count("* as count");
  return Number(count);
}
