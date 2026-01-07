import { exportActivitiesReport } from "../services/reports.service.js";

export async function exportReport(req, res, next) {
  const start = Date.now();

  try {
    const from = req.query.from;
    const to = req.query.to;

    const data = await exportActivitiesReport({ from, to });

    const duration = Date.now() - start;

    res.status(200).json({
      data,
      meta: {
        count: data.length,
        responseTimeMs: duration
      }
    });
  } catch (err) {
    next(err);
  }
}
