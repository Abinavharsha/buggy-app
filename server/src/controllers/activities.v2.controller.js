// v2: Evolved API with metadata and extensibility

import { getAllActivities } from "../services/activities.service.js";

export async function getActivitiesV2(req, res, next) {
  try {
    const start = Date.now();

    const activities = await getAllActivities();

    // v2 introduces structured response
    res.json({
      data: activities,
      meta: {
        count: activities.length,
        generatedAt: Date.now(),
        durationMs: Date.now() - start
      }
    });
  } catch (err) {
    next(err);
  }
}
