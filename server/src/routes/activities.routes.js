import { Router } from "express";
import {
  getActivities,
  getActivity
} from "../controllers/activities.controller.js";
import {
  getActivitiesUncompressed,
  getActivitiesCompressedBuggy,
  getActivitiesCompressedFixed,
} from "../controllers/activities.compression.controller.js";
const router = Router();

// Chapter-10 compression endpoints
router.get("/compression-off", getActivitiesUncompressed);
router.get("/compression-buggy", getActivitiesCompressedBuggy);
router.get("/compression-fixed", getActivitiesCompressedFixed);

// GET /api/activities?page=1&limit=20&type=...
router.get("/", getActivities);

// GET /api/activities/:id
router.get("/:id", getActivity);

export default router;
