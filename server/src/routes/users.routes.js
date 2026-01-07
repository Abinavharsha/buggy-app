import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Users endpoint (placeholder)" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "User detail endpoint (placeholder)" });
});

export default router;
