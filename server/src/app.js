import express from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes.js";
import activitiesRoutes from "./routes/activities.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import logsRoutes from "./routes/logs.routes.js";

import apiLogger from "./middlewares/apiLogger.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// import seedRoutes from "./routes/seed.routes.js";
import { initDb } from "./db/initDb.js";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Populate DB
initDb();

// API logging middleware (baseline)
app.use(apiLogger);



// Chapter 6 – BUGGY Runtime Cache (Unbounded)

// const configCache = {}; // unbounded object

// async function loadUserConfig(userId) {
//   // Simulate expensive load (DB / external service)
//   return {
//     userId,
//     theme: "dark",
//     language: "en",
//     permissions: ["read", "write"],
//     generatedAt: Date.now()
//   };
// }

// app.get("/api/config", async (req, res) => {
//   const userId = req.query.userId || "anonymous";

//   if (!configCache[userId]) {
//     console.log("[cache][buggy] MISS for user:", userId);
//     configCache[userId] = await loadUserConfig(userId);
//   } else {
//     console.log("[cache][buggy] HIT for user:", userId);
//   }

//   // Cache grows forever
//   console.log(
//     "[cache][buggy] cache size:",
//     Object.keys(configCache).length
//   );

//   // Observe memory growth
//   console.log(
//     "[memory][buggy] heapUsed:",
//     (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
//     "MB"
//   );

//   res.json(configCache[userId]);
// });




// Fixed code with console log
const CACHE_MAX_SIZE = 100;      // hard upper bound
const CACHE_TTL_MS = 60 * 1000;  // 1 minute TTL

// Map preserves insertion order → easy eviction
const configCache = new Map();

async function loadUserConfig(userId) {
  // Simulate expensive load (DB / external service)
  return {
    userId,
    theme: "dark",
    language: "en",
    permissions: ["read", "write"],
    generatedAt: Date.now()
  };
}

function getFromCache(key) {
  const entry = configCache.get(key);

  if (!entry) return null;

  // TTL check
  if (entry.expiresAt < Date.now()) {
    configCache.delete(key);
    console.log("[cache][fixed] EXPIRED", key);
    return null;
  }

  return entry.value;
}

function setInCache(key, value) {
  // Evict oldest entry if size limit reached
  if (configCache.size >= CACHE_MAX_SIZE) {
    const oldestKey = configCache.keys().next().value;
    configCache.delete(oldestKey);
    console.log("[cache][fixed] EVICTED", oldestKey);
  }

  configCache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS
  });
}

app.get("/api/config", async (req, res) => {
  const userId = req.query.userId || "anonymous";

  let config = getFromCache(userId);

  if (!config) {
    console.log("[cache][fixed] MISS for user:", userId);
    config = await loadUserConfig(userId);
    setInCache(userId, config);
  } else {
    console.log("[cache][fixed] HIT for user:", userId);
  }

  console.log(
    "[cache][fixed] cache size:",
    configCache.size
  );

  console.log(
    "[memory][fixed] heapUsed:",
    (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
    "MB"
  );

  res.json(config);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/users", usersRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/logs", logsRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

export default app;
