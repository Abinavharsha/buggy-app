import db from "./knex.js";

const USER_ID = 1;

export async function seedHeavy() {
  console.log("[seed] seeding heavy data...");

  await db("activity_logs").del();
  await db("user_activities").del();
  await db("activities").del();

  const activities = [];
  for (let i = 1; i <= 200; i++) {
    activities.push({
      id: i,
      title: `Activity ${i}`,
      type: i % 2 === 0 ? "lesson" : "quiz"
    });
  }
  await db("activities").insert(activities);

  const userActivities = [];
  for (let i = 1; i <= 1000; i++) {
    userActivities.push({
      user_id: USER_ID,
      activity_id: (i % 200) + 1,
      status: i % 3 === 0 ? "completed" : "started"
    });
  }

  while (userActivities.length) {
    await db("user_activities").insert(userActivities.splice(0, 200));
  }

  const logs = [];
  for (let i = 1; i <= 500; i++) {
    logs.push({
      user_id: USER_ID,
      activity_id: (i % 200) + 1,
      action: "viewed",
      metadata: JSON.stringify({ source: "seed-heavy" }),
      created_at: new Date()
    });
  }

  while (logs.length) {
    await db("activity_logs").insert(logs.splice(0, 200));
  }

  console.log("[seed] heavy seed complete");
}
