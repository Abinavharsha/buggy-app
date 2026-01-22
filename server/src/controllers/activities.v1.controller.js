// v1: Stable API contract (legacy)

import { getAllActivities } from "../services/activities.service.js";

export async function getActivitiesV1(req, res, next) {
  try {
    const activities = await getAllActivities();

    // v1 contract: flat array, minimal fields
    res.json(activities);
  } catch (err) {
    next(err);
  }
}
