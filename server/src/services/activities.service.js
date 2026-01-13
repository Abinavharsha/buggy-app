import db from "../db/knex.js";

/**
 * List activities with pagination
 */
export async function listActivities({ page, limit, type }) {
  let query = db("activities");

  if (type) {
    query = query.where({ type });
  }

  // OFFSET pagination (intentional)
  const rows = await query
    .orderBy("created_at", "desc")
    .offset((page - 1) * limit)
    .limit(limit);

  const results = [];

  for (const activity of rows) {
    // Fetch participant count per activity (N+1)
    const participants = await db("user_activities")
      .where({ activity_id: activity.id });

    results.push({
      id: activity.id,
      title: activity.title,
      type: activity.type,
      description: activity.description,
      participantCount: participants.length
    });
  }

  return results;
}

/**
 * Fetch single activity
 */
export async function getActivityById(activityId) {
  // Overfetch full row
  const activity = await db("activities")
    .where({ id: activityId })
    .first();

  return activity;
}

/**
 * Fetch activity participants
 */
export async function getActivityParticipants(activityId) {
  // Fetch all user_activities rows
  const rows = await db("user_activities")
    .where({ activity_id: activityId })
    .orderBy("created_at", "desc");

  const results = [];

  for (const row of rows) {
    // Fetch user per participant (N+1 again)
    const user = await db("users")
      .where({ id: row.user_id })
      .first();

    results.push({
      userId: user.id,
      name: user.name,
      email: user.email,
      status: row.status,
      score: row.score,
      completedAt: row.completed_at
    });
  }

  return results;
}


export async function countActivities({ type }) {
  let query = db("activities");

  if (type) {
    query = query.where({ type });
  }

  const [{ count }] = await query.count("* as count");
  return Number(count);
}
