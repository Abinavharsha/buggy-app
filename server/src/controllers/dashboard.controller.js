import {
  getDashboardSummary,
  getRecentActivities,
  getActivityStats
} from "../services/dashboard.service.js";

export async function getDashboard(req, res, next) {
  const start = Date.now();

  try {
    const userId = req.query.userId;

    // Sequential service calls (intentional)
    const summary = await getDashboardSummary(userId);
    const recentActivities = await getRecentActivities(userId);
    const stats = await getActivityStats(userId);

    const response = {
      summary,
      recentActivities,
      stats
    };

    const duration = Date.now() - start;

    res.status(200).json({
      data: response,
      meta: {
        responseTimeMs: duration
      }
    });
  } catch (err) {
    next(err);
  }
}
