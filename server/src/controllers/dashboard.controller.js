import {
  getDashboardSummary,
  getRecentActivities,
  getActivityStats
} from "../services/dashboard.service.js";

// export async function getDashboard(req, res, next) {
//   try {
//     const userId = req.query.userId;

//     const summary = await getDashboardSummary(userId);
//     const activities = await getRecentActivities(userId);
//     const stats = await getActivityStats(userId);

//     res.json({
//       summary,
//       recentActivities: activities,
//       stats
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// // Console Log (Buggy)
export async function getDashboard(req, res, next) {
  try {
    const userId = req.query.userId;

    const start = Date.now();

    const t0 = Date.now();
    const summary = await getDashboardSummary(userId);
    console.log("[seq] summary:", Date.now() - t0, "ms");

    const t1 = Date.now();
    const activities = await getRecentActivities(userId);
    console.log("[seq] activities:", Date.now() - t1, "ms");

    const t2 = Date.now();
    const stats = await getActivityStats(userId);
    console.log("[seq] stats:", Date.now() - t2, "ms");

    console.log("[seq] total request:", Date.now() - start, "ms");

    res.json({
      summary,
      recentActivities: activities,
      stats
    });
  } catch (err) {
    next(err);
  }
}

// // Fixed with console log
// export async function getDashboard(req, res, next) {
//   try {
//     const userId = req.query.userId;

//     const start = Date.now();

//     const t0 = Date.now();
//     const summaryPromise = getDashboardSummary(userId);

//     const t1 = Date.now();
//     const activitiesPromise = getRecentActivities(userId);

//     const t2 = Date.now();
//     const statsPromise = getActivityStats(userId);

//     const [summary, activities, stats] = await Promise.all([
//       summaryPromise,
//       activitiesPromise,
//       statsPromise
//     ]);

//     console.log("[par] summary:", Date.now() - t0, "ms");
//     console.log("[par] activities:", Date.now() - t1, "ms");
//     console.log("[par] stats:", Date.now() - t2, "ms");
//     console.log("[par] total request:", Date.now() - start, "ms");

//     res.json({
//       summary,
//       recentActivities: activities,
//       stats
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// // Fixed without console log
// export async function getDashboard(req, res, next) {
//   try {
//     const userId = req.query.userId;

//     const [summary, activities, stats] = await Promise.all([
//       getDashboardSummary(userId),
//       getRecentActivities(userId),
//       getActivityStats(userId)
//     ]);

//     res.json({
//       summary,
//       recentActivities: activities,
//       stats
//     });
//   } catch (err) {
//     next(err);
//   }
// }