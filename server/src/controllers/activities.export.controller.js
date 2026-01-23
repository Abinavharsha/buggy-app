import { getAllActivities } from "../services/activities.service.js";
import db from "../db/knex.js";

export async function exportActivities(req, res, next) {
  try {
    const activities = await getAllActivities();
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=activities.json"
    );
    res.json(activities);
  } catch (err) {
    next(err);
  }
}
