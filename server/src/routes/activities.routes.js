import { Router } from "express";
import {
  getActivities,
  getActivity
} from "../controllers/activities.controller.js";
import { getActivitiesV1 } from "../controllers/activities.v1.controller.js";
import { getActivitiesV2 } from "../controllers/activities.v2.controller.js";

const router = Router();

// Versioned APIs FIRST
router.get("/v1", getActivitiesV1);
router.get("/v2", getActivitiesV2);

// GET /api/activities
router.get("/", getActivities);

// GET /api/activities/:id
router.get("/:id", getActivity);

export default router;
