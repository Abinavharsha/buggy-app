import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { markUserActivitiesProcessed } from "../services/dashboard.service.js";

const router = express.Router();

router.get("/", getDashboard);

export default router;

router.post("/process", async (req, res, next) => {
  try {
    const result = await markUserActivitiesProcessed(1);
    res.json(result);
  } catch (e) {
    next(e);
  }
});