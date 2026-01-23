import { Router } from "express";
import {
  getActivities,
  getActivity
} from "../controllers/activities.controller.js";
import {
  getActivitiesWithRetryBug,
  getActivitiesWithRetryFixed
} from "../controllers/activities.retry.controller.js";

const router = Router();

// Chapter-9 retry endpoints
router.get("/retry-buggy", getActivitiesWithRetryBug);
router.get("/retry-fixed", getActivitiesWithRetryFixed);

// GET /api/activities?page=1&limit=20&type=...
router.get("/", getActivities);

// GET /api/activities/:id
router.get("/:id", getActivity);

export default router;
