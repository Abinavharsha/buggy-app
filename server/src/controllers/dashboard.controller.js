import {
  getDashboardSummary,
  getRecentActivities,
  getActivityStats
} from "../services/dashboard.service.js";
import { recordDashboardView } from "../services/reports.service.js";

export async function getDashboard(req, res, next) {
  try {
    const userId = req.query.userId;

    const summary = await getDashboardSummary(userId);
    const activities = await getRecentActivities(userId);
    const stats = await getActivityStats(userId);
    recordDashboardView(userId).catch(() => {});

    res.json({
      summary,
      recentActivities: activities,
      stats
    });
  } catch (err) {
    next(err);
  }
}
