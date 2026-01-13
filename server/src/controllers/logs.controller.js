import { getApiLogs } from "../services/logs.service.js";

export async function getLogs(req, res, next) {

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const path = req.query.path;
    const statusCode = req.query.statusCode;

    const logs = await getApiLogs({
      page,
      limit,
      path,
      statusCode
    });

    res.status(200).json({
      data: logs,
      meta: { page, limit }
    });
  } catch (err) {
    next(err);
  }
}
