import db from "./knex.js";

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithinDays(days) {
  const now = Date.now();
  const past = now - days * 24 * 60 * 60 * 1000;
  return new Date(past + Math.random() * (now - past));
}

export async function seedHeavy() {
  console.log("[seed] seeding realistic data...");

  // ─────────────────────────────────────────────
  // CLEAN TABLES
  // ─────────────────────────────────────────────
  await db("activity_logs").del();
  await db("user_activities").del();
  await db("activities").del();
  await db("users").del();

  // ─────────────────────────────────────────────
  // USERS (realistic mix)
  // ─────────────────────────────────────────────
  const users = [];

  for (let i = 1; i <= 15; i++) {
    users.push({
      id: i,
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

  await db("users").insert(users);
  console.log("[seed] users:", users.length);

  // ─────────────────────────────────────────────
  // ACTIVITIES (uneven importance)
  // ─────────────────────────────────────────────
  const activities = [];

  for (let i = 1; i <= 200; i++) {
    activities.push({
      id: i,
      title: `Activity ${i}`,
      type: i % 4 === 0 ? "lesson" : "quiz"
    });
  }

  await db("activities").insert(activities);
  console.log("[seed] activities:", activities.length);

  // ─────────────────────────────────────────────
  // USER ACTIVITIES (skewed participation)
  // ─────────────────────────────────────────────
  const userActivities = [];

  for (let i = 0; i < 1200; i++) {
    const userId = randomChoice(
      users.filter(u => u.status === "active").map(u => u.id)
    );

    const activityId =
      Math.random() < 0.6
        ? randomChoice([1, 2, 3, 4, 5]) // popular activities
        : Math.floor(Math.random() * 200) + 1;

    userActivities.push({
      user_id: userId,
      activity_id: activityId,
      status: randomChoice(["started", "completed", "completed", "started"]),
      score: Math.random() < 0.5 ? null : Math.floor(Math.random() * 100),
      completed_at: randomDateWithinDays(30)
    });
  }

  while (userActivities.length) {
    await db("user_activities").insert(userActivities.splice(0, 200));
  }

  console.log("[seed] user activities seeded");

  // ─────────────────────────────────────────────
  // ACTIVITY LOGS (realistic noise)
  // ─────────────────────────────────────────────
  const actions = ["viewed", "started", "completed", "failed"];
  const logs = [];

  for (let i = 0; i < 800; i++) {
    logs.push({
      user_id: randomChoice(users).id,
      activity_id: Math.floor(Math.random() * 200) + 1,
      action: randomChoice(actions),
      metadata: JSON.stringify({
        source: randomChoice(["web", "mobile", "api"]),
        retry: Math.random() < 0.1
      }),
      created_at: randomDateWithinDays(14)
    });
  }

  while (logs.length) {
    await db("activity_logs").insert(logs.splice(0, 200));
  }

  console.log("[seed] logs seeded");
  console.log("[seed] realistic seed complete ✅");
}
