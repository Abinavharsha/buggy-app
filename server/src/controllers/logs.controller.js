import { getApiLogs, countLogs } from "../services/logs.service.js";

export async function getLogs(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const [logs, total] = await Promise.all([
      getApiLogs({ page, limit }),
      countLogs({})
    ]);

    res.status(200).json({
      data: logs,
      meta: {
        page,
        limit,
        total
      }
    });
  } catch (err) {
    next(err);
  }
}

