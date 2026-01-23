import { Router } from "express";
import {
  getActivities,
  getActivity
} from "../controllers/activities.controller.js";
import { getActivitiesBulk } from "../controllers/activities.stream.controller.js";
import { getActivitiesStream } from "../controllers/activities.stream.controller.js";

const router = Router();

// Chapter-8 comparison endpoints
router.get("/bulk", getActivitiesBulk);
router.get("/stream", getActivitiesStream);

// GET /api/activities?page=1&limit=20&type=...
router.get("/", getActivities);

// GET /api/activities/:id
router.get("/:id", getActivity);

export default router;
