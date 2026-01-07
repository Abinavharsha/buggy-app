import { Router } from "express";

const router = Router();

router.get("/export", (req, res) => {
  res.json({ message: "Export report endpoint (placeholder)" });
});

export default router;
