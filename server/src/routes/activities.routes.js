import { Router } from "express";
import {
  getActivities,
  getActivity
} from "../controllers/activities.controller.js";

const router = Router();

// GET /api/activities?page=1&limit=20&type=...
router.get("/", getActivities);

// GET /api/activities/:id
router.get("/:id", getActivity);

export default router;
