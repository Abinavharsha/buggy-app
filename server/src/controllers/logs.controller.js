import { getApiLogs } from "../services/logs.service.js";

export async function listApiLogs(req, res, next) {
  const start = Date.now();

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const path = req.query.path;
    const statusCode = req.query.statusCode;

    const logs = await getApiLogs({
      page,
      limit,
      path,
      statusCode
    });

    const duration = Date.now() - start;

    res.status(200).json({
      data: logs,
      meta: {
        page,
        limit,
        responseTimeMs: duration
      }
    });
  } catch (err) {
    next(err);
  }
}
