import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Logs endpoint (placeholder)" });
});

export default router;
