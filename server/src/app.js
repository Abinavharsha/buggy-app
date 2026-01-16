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


// // // Buggy code with console log
// let activeRequests = 0;

// app.get("/api/heavy", async (req, res) => {
//   activeRequests++;
//   const start = Date.now();

//   console.log(
//     "[heavy][buggy] start | active:",
//     activeRequests
//   );

//   // CPU-bound blocking work
//   while (Date.now() - start < 100) {}

//   activeRequests--;

//   console.log(
//     "[heavy][buggy] end | duration:",
//     Date.now() - start,
//     "ms | active:",
//     activeRequests
//   );

//   res.json({ status: "ok" });
// });




// Fixed code with console log
const MAX_CONCURRENT = 5;
let activeRequests = 0;

app.get("/api/heavy", async (req, res) => {
  if (activeRequests >= MAX_CONCURRENT) {
    console.log(
      "[heavy][fixed] REJECTED | active:",
      activeRequests
    );

    return res
      .status(503)
      .json({ error: "Server busy" });
  }

  activeRequests++;
  const start = Date.now();

  console.log(
    "[heavy][fixed] start | active:",
    activeRequests
  );

  while (Date.now() - start < 100) {}

  activeRequests--;

  console.log(
    "[heavy][fixed] end | duration:",
    Date.now() - start,
    "ms | active:",
    activeRequests
  );

  res.json({ status: "ok" });
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
