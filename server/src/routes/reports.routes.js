import { Router } from "express";
import { getActivitySummary } from "../controllers/reports.controller.js";

const router = Router();

// GET /api/reports/activity-summary
router.get("/activity-summary", getActivitySummary);

export default router;
