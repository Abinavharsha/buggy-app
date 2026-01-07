import db from "../db/knex.js";

export default function apiLogger(req, res, next) {
  const start = Date.now();

  // Capture request payload (intentional: stringified)
  const requestPayload =
    req.method === "GET"
      ? JSON.stringify(req.query)
      : JSON.stringify(req.body);

  res.on("finish", async () => {
    const duration = Date.now() - start;

    try {
      await db("api_logs").insert({
        method: req.method,
        path: req.originalUrl,
        status_code: res.statusCode,
        response_time_ms: duration,
        payload: requestPayload,
        created_at: new Date()
      });
    } catch (err) {
      // Logging failure should not crash request
      console.error("[apiLogger] failed to log request", err);
    }
  });

  next();
}
