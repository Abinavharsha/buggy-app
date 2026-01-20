import {
  getDashboardSummary,
  getRecentActivities,
  getActivityStats
} from "../services/dashboard.service.js";
import {
  getDashboardViews,
  recordDashboardView
} from "../services/reports.service.js";

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

// // Buggy Code with Console Log
// export async function getDashboard(req, res, next) {
//   try {
//     const userId = Number(req.query.userId);
//     const start = Date.now();

//     console.log("[buggy] fetching summary");
//     const summary = await getDashboardSummary(userId);

//     console.log("[buggy] fetching activities");
//     const activities = await getRecentActivities(userId);

//     console.log("[buggy] fetching stats");
//     const stats = await getActivityStats(userId);

//     console.log("[buggy] total time:", Date.now() - start, "ms");

//     res.json({
//       summary,
//       recentActivities: activities,
//       stats
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// Fixed code with console logs
export async function getDashboard(req, res, next) {
  try {
    const userId = Number(req.query.userId);
    const start = Date.now();

<<<<<<< HEAD
    console.log("[fixed] fetching dashboard data in parallel");

    const [
      summary,
      activities,
      stats
    ] = await Promise.all([
      getDashboardSummary(userId),
      getRecentActivities(userId),
      getActivityStats(userId)
    ]);

    console.log("[fixed] total time:", Date.now() - start, "ms");
=======
    const summary = await getDashboardSummary(userId);
    const activities = await getRecentActivities(userId);
    const stats = await getActivityStats(userId);
    recordDashboardView(userId).catch(() => { });
    getDashboardViews(userId).catch(() => { });
>>>>>>> 9f3e42e0d7fc6ce664461434c679e79e6e8929ad

    res.json({
      summary,
      recentActivities: activities,
      stats
    });
  } catch (err) {
    next(err);
  }
}


//Fixed code without console logs
// export async function getDashboard(req, res, next) {
//   try {
//     const userId = Number(req.query.userId);

//     const [
//       summary,
//       activities,
//       stats
//     ] = await Promise.all([
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
