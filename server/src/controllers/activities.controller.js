import {
  listActivities,
  countActivities,
  getActivityById,
  getActivityParticipants
} from "../services/activities.service.js";

export async function getActivities(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const type = req.query.type;

    const [activities, total] = await Promise.all([
      listActivities({ page, limit, type }),
      countActivities({ type })
    ]);

    res.status(200).json({
      data: activities,
      meta: {
        page,
        limit,
        total
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getActivity(req, res, next) {
  try {
    const activityId = Number(req.params.id);

    const activity = await getActivityById(activityId);

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    const participants = await getActivityParticipants(activityId);

    res.status(200).json({
      data: {
        activity,
        participants
      }
    });
  } catch (err) {
    next(err);
  }
}
