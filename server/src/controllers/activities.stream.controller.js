import { getAllActivities } from "../services/activities.service.js";
import db from "../db/knex.js";

export async function getActivitiesBulk(req, res, next) {
  try {
    const activities = await getAllActivities();

    res.json(activities);

  } catch (err) {
    next(err);
  }
}
