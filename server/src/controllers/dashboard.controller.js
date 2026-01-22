// import {
//   getDashboardSummary,
//   getRecentActivities,
//   getActivityStats
// // } from "../services/dashboard.service.js";
// import {
//   getDashboardViews,
//   recordDashboardView
// } from "../services/reports.service.js";

// export async function getDashboard(req, res, next) {
//   try {
//     const userId = req.query.userId;

//     const summary = await getDashboardSummary(userId);
//     const activities = await getRecentActivities(userId);
//     const stats = await getActivityStats(userId);
//     recordDashboardView(userId).catch(() => { });
//     getDashboardViews(userId).catch(() => { });

//     res.json({
//       summary,
//       recentActivities: activities,
//       stats
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// // Buggy code with console log
// import {
//   getDashboardSummary,
//   getRecentActivities,
//   getActivityStats
// } from "../services/dashboard.service.js";

// import {
//   getDashboardViews,
//   recordDashboardView
// } from "../services/reports.service.js";

// export async function getDashboard(req, res, next) {
//   try {
//     const userId = Number(req.query.userId);
//     const start = Date.now();

//     console.log("[chapter-2][aggregate] dashboard request started");
//     console.log("[chapter-2][aggregate] aggregating backend services");

//     const [
//       summary,
//       activities,
//       stats
//     ] = await Promise.all([
//       getDashboardSummary(userId),
//       getRecentActivities(userId),
//       getActivityStats(userId)
//     ]);

//     console.log(
//       "[chapter-2][aggregate] aggregation completed in",
//       Date.now() - start,
//       "ms"
//     );

//     recordDashboardView(userId).catch(() => {});
//     getDashboardViews({ userId }).catch(() => {});

//     res.json({
//       summary,
//       recentActivities: activities,
//       stats
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// // Fixed code with console log
// import {
//   getDashboardSummary,
//   getRecentActivities,
//   getActivityStats
// } from "../services/dashboard.service.js";

// import {
//   getDashboardViews,
//   recordDashboardView
// } from "../services/reports.service.js";

// export async function getDashboard(req, res, next) {
//   try {
//     const userId = Number(req.query.userId);
//     const start = Date.now();

//     console.log("[chapter-2][fixed] dashboard request started");
//     console.log("[chapter-2][fixed] aggregating backend services in parallel");

//     const [
//       summary,
//       activities,
//       stats
//     ] = await Promise.all([
//       getDashboardSummary(userId),
//       getRecentActivities(userId),
//       getActivityStats(userId)
//     ]);

//     console.log(
//       "[chapter-2][fixed] aggregation completed in",
//       Date.now() - start,
//       "ms"
//     );

//     recordDashboardView(userId).catch(() => {});
//     getDashboardViews({ userId }).catch(() => {});

//     res.json({
//       summary,
//       recentActivities: activities,
//       stats
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// Fixed code without console log
import {
  getDashboardSummary,
  getRecentActivities,
  getActivityStats
} from "../services/dashboard.service.js";
import {
  getDashboardViews,
  recordDashboardView
} from "../services/reports.service.js";

export async function getDashboard(req, res, next) {
  try {
    const userId = Number(req.query.userId);
    const start = Date.now();
    const [
      summary,
      activities,
      stats
    ] = await Promise.all([
      getDashboardSummary(userId),
      getRecentActivities(userId),
      getActivityStats(userId)
    ]);
    recordDashboardView(userId).catch(() => {});
    getDashboardViews({ userId }).catch(() => {});

    res.json({
      summary,
      recentActivities: activities,
      stats
    });
  } catch (err) {
    next(err);
  }
}