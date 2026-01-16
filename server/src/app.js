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
// app.get("/api/dashboard-test", async (req, res) => {
//   const start = Date.now();

//   const data = {
//     stats: { total: 1200, completed: 900 },
//     activities: new Array(500).fill({
//       id: 1,
//       title: "Sample Activity",
//       type: "quiz"
//     })
//   };

//   const response = {
//     success: true,
//     meta: {
//       serverTime: Date.now(),
//       env: process.env.NODE_ENV,
//       debugId: Math.random().toString(36)
//     },
//     data
//   };

//   const serializeStart = Date.now();
//   const json = JSON.stringify(response);

//   console.log(
//     "[dashboard][buggy] serialization time:",
//     Date.now() - serializeStart,
//     "ms"
//   );

//   console.log(
//     "[dashboard][buggy] payload size:",
//     Buffer.byteLength(json),
//     "bytes"
//   );

//   res.setHeader("Content-Type", "application/json");
//   res.send(json);
// });

// Fixed code with console log
app.get("/api/dashboard-test", async (req, res) => {
  const data = {
    stats: { total: 1200, completed: 900 },
    activities: new Array(500).fill({
      id: 1,
      title: "Sample Activity",
      type: "quiz"
    })
  };

  const response = { data };

  const serializeStart = Date.now();
  const json = JSON.stringify(response);

  console.log(
    "[dashboard][fixed] serialization time:",
    Date.now() - serializeStart,
    "ms"
  );

  console.log(
    "[dashboard][fixed] payload size:",
    Buffer.byteLength(json),
    "bytes"
  );

  res.setHeader("Content-Type", "application/json");
  res.send(json);
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
