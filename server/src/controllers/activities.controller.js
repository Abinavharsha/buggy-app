import {
  listActivities,
  countActivities,
  getAllActivities,
  getActivityById,
  getActivityParticipants
} from "../services/activities.service.js";

// // Exclude this code
// export async function getActivities(req, res, next) {
//   try {
//     const activities = await getAllActivities();
//     res.json(activities);
//   } catch (err) {
//     next(err);
//   }
// }


// // Buggy code with pagination and with console logs
// export async function getActivities(req, res, next) {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 20;

//     console.log("[chapter-6][buggy] page:", page, "limit:", limit);

//     const allActivities = await getAllActivities();

//     console.log(
//       "[chapter-6][buggy] total rows fetched:",
//       allActivities.length
//     );

//     const start = (page - 1) * limit;
//     const paged = allActivities.slice(start, start + limit);

//     res.json({
//       data: paged,
//       meta: {
//         page,
//         limit,
//         total: allActivities.length
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// // Fixed code with console logs
// export async function getActivities(req, res, next) {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 20;
//     const type = req.query.type;

//     console.log("[chapter-6][fixed] page:", page, "limit:", limit);

//     const [rows, total] = await Promise.all([
//       listActivities({ page, limit, type }),
//       countActivities({ type })
//     ]);

//     // Adapter layer: normalize contract
//     const shaped = rows.map(a => ({
//       id: a.id,
//       title: a.title,
//       type: a.type,
//       participants: a.participantCount
//     }));

//     console.log(
//       "[chapter-6][fixed] rows returned:",
//       shaped.length
//     );

//     res.json({
//       data: shaped,
//       meta: {
//         page,
//         limit,
//         total
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// }



// // Fixed code without console logs
export async function getActivities(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const type = req.query.type;
    const [rows, total] = await Promise.all([
      listActivities({ page, limit, type }),
      countActivities({ type })
    ]);
    const shaped = rows.map(a => ({
      id: a.id,
      title: a.title,
      type: a.type,
      participants: a.participantCount
    }));
    res.json({
      data: shaped,
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
