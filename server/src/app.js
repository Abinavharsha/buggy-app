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

// // Buggy code with console log
// let totalRequests = 0;

// app.get("/api/search", async (req, res) => {
//   totalRequests++;
//   const start = Date.now();

//   console.log(
//     "[search][buggy] request",
//     totalRequests
//   );

//   while (Date.now() - start < 50) {}

//   res.json({ results: [] });
// });




// // Fixed code with console log
const RATE_LIMIT_WINDOW_MS = 5_000; // 5 seconds
const RATE_LIMIT_MAX = 5;           // max requests per window

const rateLimitStore = new Map();

app.get("/api/search", async (req, res) => {
  const ip = req.ip;
  const now = Date.now();

  const entry =
    rateLimitStore.get(ip) || {
      count: 0,
      windowStart: now
    };

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    console.log("[rate][fixed] reset window for", ip);
    entry.count = 0;
    entry.windowStart = now;
  }

  entry.count++;
  rateLimitStore.set(ip, entry);

  if (entry.count > RATE_LIMIT_MAX) {
    console.log(
      "[rate][fixed] REJECTED",
      ip,
      "count:",
      entry.count
    );

    return res
      .status(429)
      .json({ error: "Too many requests" });
  }

  console.log(
    "[rate][fixed] allowed",
    ip,
    "count:",
    entry.count
  );

  const start = Date.now();
  while (Date.now() - start < 50) {}

  res.json({ results: [] });
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
