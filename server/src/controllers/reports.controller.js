import { getActivitySummaryReport } from "../services/reports.service.js";

export async function getActivitySummary(req, res, next) {
  try {
    const { activities, participants } =
      await getActivitySummaryReport();

    const result = [];

    for (const activity of activities) {
      let count = 0;

      for (const p of participants) {
        if (p.activity_id === activity.id) {
          count++;
        }
      }

      result.push({
        type: activity.type,
        count
      });
    }

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
}