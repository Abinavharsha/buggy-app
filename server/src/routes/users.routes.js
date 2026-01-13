import { Router } from "express";
import {
  getUsersList,
  getUser,
  getUserActivityList
} from "../controllers/users.controller.js";

const router = Router();

// GET /api/users
router.get("/", getUsersList);

// GET /api/users/:id
router.get("/:id", getUser);

// GET /api/users/:id/activities
router.get("/:id/activities", getUserActivityList);

export default router;
