import { getActivitySummaryReport } from "../services/reports.service.js";

export async function getActivitySummary(req, res, next) {

  try {
    const data = await getActivitySummaryReport();

    res.status(200).json({
      data
    });
  } catch (err) {
    next(err);
  }
}
