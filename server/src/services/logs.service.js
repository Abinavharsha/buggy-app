import db from "../db/knex.js";

/**
 * Fetch API logs
 */
export async function getApiLogs({ page, limit, path, statusCode }) {
  let query = db("api_logs");

  if (path) {
    query = query.where("path", "like", `%${path}%`);
  }

  if (statusCode) {
    query = query.where({ status_code: statusCode });
  }

  // OFFSET pagination (intentional)
  const rows = await query
    .orderBy("created_at", "desc")
    .offset((page - 1) * limit)
    .limit(limit);

  const results = [];

  for (const row of rows) {
    // Payload passed through directly (large text)
    results.push({
      id: row.id,
      method: row.method,
      path: row.path,
      statusCode: row.status_code,
      responseTimeMs: row.response_time_ms,
      payload: row.payload,
      createdAt: row.created_at
    });
  }

  return results;
}
