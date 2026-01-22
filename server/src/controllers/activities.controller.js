import {
  listActivities,
  countActivities,
  getAllActivities,
  getActivityById,
  getActivityParticipants
} from "../services/activities.service.js";

export async function getActivities(req, res, next) {
  try {
    const activities = await getAllActivities();
    res.json(activities);
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
