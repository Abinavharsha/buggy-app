import {
  listActivities,
  countActivities,
  getAllActivities,
  getActivityById,
  getActivityParticipants
} from "../services/activities.service.js";

// Code might be different, so please adjust accordingly
export async function getActivities(req, res, next) {
  try {
    const activities = await getAllActivities();
    res.json(activities);
  } catch (err) {
    next(err);
  }
}


// buggy code without console log
// export async function getActivities(req, res, next) {
//   try {
//     const activities = await getAllActivities();

//     const shaped = activities.map(a => ({
//       id: a.id,
//       title: a.title,
//       type: a.type,
//       participants: a.participants
//     }));

//     res.json(shaped);
//   } catch (err) {
//     next(err);
//   }
// }

// // buggy code with console logs
// export async function getActivities(req, res, next) {
//   try {
//     const start = Date.now();
//     console.log("[chapter-4][buggy] fetching activities");

//     const activities = await getAllActivities();

//     console.log(
//       "[chapter-4][buggy] duration:",
//       Date.now() - start,
//       "ms"
//     );

//     res.json({
//       success: true,
//       meta: {
//         generatedAt: Date.now(),
//         durationMs: Date.now() - start
//       },
//       data: activities
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// // Fixed code with console log
// export async function getActivities(req, res, next) {
//   try {
//     const start = Date.now();
//     console.log("[chapter-4][fixed] fetching activities");

//     const activities = await getAllActivities();

//     console.log(
//       "[chapter-4][fixed] duration:",
//       Date.now() - start,
//       "ms"
//     );
//     res.json(activities);
//   } catch (err) {
//     next(err);
//   }
// }



// fixed code without console log
// export async function getActivities(req, res, next) {
//   try {
//    const activities = await getAllActivities();
//     res.json(activities);
//   } catch (err) {
//     next(err);
//   }
// }






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
