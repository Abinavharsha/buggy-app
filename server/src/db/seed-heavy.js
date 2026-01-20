import db from "./knex.js";

/**
 * --------------------------------------------------
 * SEED SCALE (change numbers only here)
 * --------------------------------------------------
 */
const SEED_SCALE = {
  USERS: 300,
  ACTIVITIES: 8000,
  USER_ACTIVITIES: 8000,
  ACTIVITY_LOGS: 8000
};

/**
 * One heavy user for performance labs
 */
const HEAVY_USER_ID = 1;

/**
 * SQLite-safe batch size
 */
const BATCH_SIZE = 50;

/**
 * Helpers
 */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithinDays(days) {
  const now = Date.now();
  const past = now - days * 24 * 60 * 60 * 1000;
  return new Date(past + Math.random() * (now - past));
}

export async function seedHeavy() {

  // ─────────────────────────────────────────────
  // CLEAN TABLES (safe order)
  // ─────────────────────────────────────────────
  await db.transaction(async trx => {
    await trx.raw("PRAGMA foreign_keys = OFF");
    await trx("activity_logs").del();
    await trx("user_activities").del();
    await trx("activities").del();
    await trx("users").del();
    await trx.raw("PRAGMA foreign_keys = ON");
  });

  // ─────────────────────────────────────────────
  // USERS
  // ─────────────────────────────────────────────
  const users = [];

  for (let i = 1; i <= SEED_SCALE.USERS; i++) {
    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: i === 1 ? "admin" : "student",
      status: i % 7 === 0 ? "inactive" : "active",
      preferences:
        i % 3 === 0
          ? JSON.stringify({ theme: "dark" })
          : JSON.stringify({ theme: "light", lang: "en" })
    });
  }

  while (users.length) {
    await db("users").insert(users.splice(0, BATCH_SIZE));
  }
  const activeUserIds = await db("users")
    .where({ status: "active" })
    .pluck("id");

  // ─────────────────────────────────────────────
  // ACTIVITIES
  // ─────────────────────────────────────────────
  const activities = [];

  for (let i = 1; i <= SEED_SCALE.ACTIVITIES; i++) {
    activities.push({
      title: `Activity ${i}`,
      type: i % 4 === 0 ? "lesson" : "quiz"
    });
  }

  while (activities.length) {
    await db("activities").insert(activities.splice(0, BATCH_SIZE));
  }
  const activityIds = await db("activities").pluck("id");

  // ─────────────────────────────────────────────
  // USER ACTIVITIES (skewed toward user 1)
  // ─────────────────────────────────────────────
  const userActivities = [];

  for (let i = 0; i < SEED_SCALE.USER_ACTIVITIES; i++) {
    const userId =
      Math.random() < 0.75
        ? HEAVY_USER_ID
        : randomChoice(activeUserIds);

    const activityId =
      Math.random() < 0.6
        ? randomChoice(activityIds.slice(0, 10))
        : randomChoice(activityIds);

    const status = randomChoice([
      "started",
      "completed",
      "completed",
      "started"
    ]);

    userActivities.push({
      user_id: userId,
      activity_id: activityId,
      status,
      score: Math.random() < 0.5 ? null : Math.floor(Math.random() * 100),
      completed_at:
        status === "completed"
          ? randomDateWithinDays(30)
          : null
    });
  }

  while (userActivities.length) {
    await db("user_activities").insert(
      userActivities.splice(0, BATCH_SIZE)
    );
  }
  // ─────────────────────────────────────────────
  // ACTIVITY LOGS (skewed toward user 1)
  // ─────────────────────────────────────────────
  const actions = ["viewed", "started", "completed", "failed"];
  const logs = [];

  for (let i = 0; i < SEED_SCALE.ACTIVITY_LOGS; i++) {
    logs.push({
      user_id:
        Math.random() < 0.75
          ? HEAVY_USER_ID
          : randomChoice(activeUserIds),
      activity_id: randomChoice(activityIds),
      action: randomChoice(actions),
      metadata: JSON.stringify({
        source: randomChoice(["web", "mobile", "api"]),
        retry: Math.random() < 0.1
      }),
      created_at: randomDateWithinDays(14)
    });
  }

  while (logs.length) {
    await db("activity_logs").insert(logs.splice(0, BATCH_SIZE));
  }
}
