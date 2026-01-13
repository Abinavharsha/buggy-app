import db from "./knex.js";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithinDays(days) {
  const now = Date.now();
  const past = now - days * 24 * 60 * 60 * 1000;
  return new Date(past + Math.random() * (now - past));
}

// ─────────────────────────────────────────────
// REALISTIC DATA SETS
// ─────────────────────────────────────────────
const USER_NAMES = [
  "Aarav Sharma",
  "Diya Patel",
  "Rohan Mehta",
  "Ananya Gupta",
  "Kunal Verma",
  "Sneha Iyer",
  "Rahul Malhotra",
  "Priya Nair",
  "Arjun Singh",
  "Neha Kapoor",
  "Vikram Rao",
  "Pooja Chawla",
  "Aditya Joshi",
  "Mehul Jain",
  "Ishita Banerjee"
];

const ACTIVITY_CATALOG = [
  { title: "Introduction to JavaScript", type: "lesson" },
  { title: "Variables & Data Types Quiz", type: "quiz" },
  { title: "Control Flow Basics", type: "lesson" },
  { title: "Loops & Conditions Quiz", type: "quiz" },
  { title: "Functions Explained", type: "lesson" },
  { title: "Functions Assessment", type: "quiz" },
  { title: "Asynchronous JavaScript", type: "lesson" },
  { title: "Promises & Async/Await Quiz", type: "quiz" },
  { title: "HTML Fundamentals", type: "lesson" },
  { title: "HTML Basics Quiz", type: "quiz" },
  { title: "CSS Layouts & Flexbox", type: "lesson" },
  { title: "CSS Selectors Quiz", type: "quiz" },
  { title: "Intro to Databases", type: "lesson" },
  { title: "SQL Fundamentals Quiz", type: "quiz" },
  { title: "REST API Concepts", type: "lesson" },
  { title: "API Design Quiz", type: "quiz" },
  { title: "Authentication & JWT", type: "lesson" },
  { title: "Security Basics Quiz", type: "quiz" }
];

const LOG_ACTIONS = ["viewed", "started", "completed", "failed"];

export async function seedHeavy() {

  // ─────────────────────────────────────────────
  // CLEAN TABLES
  // ─────────────────────────────────────────────
  await db("activity_logs").del();
  await db("user_activities").del();
  await db("activities").del();
  await db("users").del();

  // ─────────────────────────────────────────────
  // USERS
  // ─────────────────────────────────────────────
  const users = USER_NAMES.map((name, index) => ({
    id: index + 1,
    name,
    email: name.toLowerCase().replace(/ /g, ".") + "@example.com",
    role: index === 0 ? "admin" : "student",
    status: index % 6 === 0 ? "inactive" : "active",
    preferences: JSON.stringify({
      theme: index % 2 === 0 ? "dark" : "light",
      notifications: index % 3 === 0
    })
  }));

  await db("users").insert(users);

  // ─────────────────────────────────────────────
  // ACTIVITIES
  // ─────────────────────────────────────────────
  const activities = [];

  let activityId = 1;
  while (activities.length < 200) {
    for (const item of ACTIVITY_CATALOG) {
      if (activities.length >= 200) break;

      activities.push({
        id: activityId++,
        title: item.title,
        type: item.type
      });
    }
  }

  await db("activities").insert(activities);

  // ─────────────────────────────────────────────
  // USER ACTIVITIES (REALISTIC DISTRIBUTION)
  // ─────────────────────────────────────────────
  const activeUsers = users.filter(u => u.status === "active");
  const userActivities = [];

  for (let i = 0; i < 1200; i++) {
    const user = randomChoice(activeUsers);

    // Popular beginner topics appear more often
    const popularActivity =
      Math.random() < 0.6
        ? randomChoice(activities.slice(0, 10))
        : randomChoice(activities);

    const status = randomChoice([
      "started",
      "completed",
      "completed",
      "started"
    ]);

    userActivities.push({
      user_id: user.id,
      activity_id: popularActivity.id,
      status,
      score: status === "completed"
        ? Math.floor(60 + Math.random() * 40)
        : null,
      completed_at:
        status === "completed"
          ? randomDateWithinDays(30)
          : null
    });
  }

  while (userActivities.length) {
    await db("user_activities").insert(userActivities.splice(0, 200));
  }

  // ─────────────────────────────────────────────
  // ACTIVITY LOGS (MESSY & REAL)
  // ─────────────────────────────────────────────
  const logs = [];

  for (let i = 0; i < 900; i++) {
    logs.push({
      user_id: randomChoice(users).id,
      activity_id: randomChoice(activities).id,
      action: randomChoice(LOG_ACTIONS),
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
}
