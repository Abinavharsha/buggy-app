import db from "./knex.js";

export async function seedHeavy() {
  console.log("[seed] seeding heavy data...");

  // ─────────────────────────────────────────────
  // CLEAN TABLES (order matters)
  // ─────────────────────────────────────────────
  await db("activity_logs").del();
  await db("user_activities").del();
  await db("activities").del();
  await db("users").del();

  // ─────────────────────────────────────────────
  // SEED USERS
  // ─────────────────────────────────────────────
  const users = [];

  for (let i = 1; i <= 10; i++) {
    users.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: i === 1 ? "admin" : "student",
      status: "active",
      preferences: JSON.stringify({ theme: "dark" })
    });
  }

  await db("users").insert(users);

  // ─────────────────────────────────────────────
  // SEED ACTIVITIES
  // ─────────────────────────────────────────────
  const activities = [];

  for (let i = 1; i <= 200; i++) {
    activities.push({
      id: i,
      title: `Activity ${i}`,
      type: i % 2 === 0 ? "lesson" : "quiz"
    });
  }

  await db("activities").insert(activities);
  console.log("[seed] activities seeded:");

  // ─────────────────────────────────────────────
  // SEED USER ACTIVITIES (distributed)
  // ─────────────────────────────────────────────
  const userActivities = [];

  for (let i = 1; i <= 1000; i++) {
    userActivities.push({
      user_id: (i % 10) + 1,
      activity_id: (i % 200) + 1,
      status: i % 3 === 0 ? "completed" : "started"
    });
  }

  while (userActivities.length) {
    await db("user_activities").insert(userActivities.splice(0, 200));
  }

  // ─────────────────────────────────────────────
  // SEED ACTIVITY LOGS
  // ─────────────────────────────────────────────
  const logs = [];

  for (let i = 1; i <= 500; i++) {
    logs.push({
      user_id: (i % 10) + 1,
      activity_id: (i % 200) + 1,
      action: "viewed",
      metadata: JSON.stringify({ source: "seed-heavy" }),
      created_at: new Date()
    });
  }

  while (logs.length) {
    await db("activity_logs").insert(logs.splice(0, 200));
  }
}
