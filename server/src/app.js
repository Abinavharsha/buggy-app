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
