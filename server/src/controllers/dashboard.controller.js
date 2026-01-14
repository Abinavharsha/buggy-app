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

// Buggy code with console logs
export async function getDashboard(req, res, next) {
  console.log("🔥 DASHBOARD HIT", new Date().toISOString());
  console.log("[BUGGY] dashboard request received");

  try {
    const userId = req.query.userId;
    const start = Date.now();

    console.log("[BUGGY] fetching dashboard summary...");
    const summary = await getDashboardSummary(userId);
    console.log(
      "[BUGGY] summary fetched in",
      Date.now() - start,
      "ms"
    );

    console.log("[BUGGY] fetching recent activities...");
    const activities = await getRecentActivities(userId);
    console.log(
      "[BUGGY] recent activities fetched in",
      Date.now() - start,
      "ms"
    );

    console.log("[BUGGY] fetching activity stats...");
    const stats = await getActivityStats(userId);
    console.log(
      "[BUGGY] activity stats fetched in",
      Date.now() - start,
      "ms"
    );

    console.log(
      "[BUGGY] dashboard response ready in",
      Date.now() - start,
      "ms"
    );

    res.json({
      summary,
      recentActivities: activities,
      stats
    });
  } catch (err) {
    console.error("[BUGGY] dashboard error", err);
    next(err);
  }
}
