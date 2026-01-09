import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { getDashboardSummary } from "../services/dashboard.service.js";

const router = express.Router();

router.get("/", getDashboardSummary);

export default router;
