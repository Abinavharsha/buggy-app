import { getAllActivities } from "../services/activities.service.js";
import db from "../db/knex.js";

async function unstableFetch() {
  if (Math.random() < 0.6) {
    throw new Error("Downstream timeout");
  }
  return getAllActivities();
}

export async function getActivitiesWithRetryBug(req, res, next) {
  try {
    let attempts = 0;

    while (attempts < 5) {
      try {
        attempts++;
        const data = await unstableFetch();
        return res.json({ attempts, data });
      } catch (err) {
      }
    }

    res.status(503).json({
      error: "Service unavailable after retries",
      attempts
    });
  } catch (err) {
    next(err);
  }
}