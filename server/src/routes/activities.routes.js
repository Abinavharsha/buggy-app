import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Activities endpoint (placeholder)" });
});

export default router;
