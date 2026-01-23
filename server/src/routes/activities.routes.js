import { Router } from "express";
import {
  getActivities,
  getActivity
} from "../controllers/activities.controller.js";
import { exportActivities } from "../controllers/activities.export.controller.js";

const router = Router();

// Export endpoint
router.get("/export", exportActivities);

// GET /api/activities?page=1&limit=20&type=...
router.get("/", getActivities);

// GET /api/activities/:id
router.get("/:id", getActivity);

export default router;
