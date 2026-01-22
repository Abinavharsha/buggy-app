import {
  listActivities,
  countActivities,
  getAllActivities,
  getActivityById,
  getActivityParticipants
} from "../services/activities.service.js";

// export async function getActivities(req, res, next) {
//   try {
//     const activities = await getAllActivities();
//     res.json(activities);
//   } catch (err) {
//     next(err);
//   }
// }




// // buggy code with console logs
// export async function getActivities(req, res, next) {
//   try {
//     console.log("[chapter-3][buggy] fetching activities");

//     const activities = await getAllActivities();

//     const payloadSize =
//       JSON.stringify(activities).length / 1024;

//     console.log("[chapter-3][buggy] records:", activities.length);
//     console.log(
//       "[chapter-3][buggy] payload size:",
//       payloadSize.toFixed(2),
//       "KB"
//     );
//     res.json(activities);
//   } catch (err) {
//     next(err);
//   }
// }




// // Fixed code with console log
// export async function getActivities(req, res, next) {
//   try {
//     const start = Date.now();

//     console.log("[chapter-3][fixed] getActivities request received");

//     const activities = await getAllActivities();

//     console.log(
//       "[chapter-3][fixed] raw records fetched:",
//       activities.length
//     );

//     const shaped = activities.map(a => ({
//       id: a.id,
//       title: a.title,
//       type: a.type,
//       participants: a.participants
//     }));

//     const payloadSize =
//       JSON.stringify(shaped).length / 1024;

//     console.log(
//       "[chapter-3][fixed] shaped payload size:",
//       payloadSize.toFixed(2),
//       "KB"
//     );

//     console.log(
//       "[chapter-3][fixed] total processing time:",
//       Date.now() - start,
//       "ms"
//     );

//     res.json(shaped);
//   } catch (err) {
//     console.error("[chapter-3][fixed] error in getActivities", err);
//     next(err);
//   }
// }

// fixed code without console log
export async function getActivities(req, res, next) {
  try {
    const activities = await getAllActivities();

    const shaped = activities.map(a => ({
      id: a.id,
      title: a.title,
      type: a.type,
      participants: a.participants
    }));

    res.json(shaped);
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
