import db from "../db/knex.js";

/**
 * Fetch API logs
 */
// export async function getApiLogs({ page, limit, path, statusCode }) {
//   let query = db("api_logs");

//   if (path) {
//     query = query.where("path", "like", `%${path}%`);
//   }

//   if (statusCode) {
//     query = query.where({ status_code: statusCode });
//   }

//   // OFFSET pagination (intentional)
//   const rows = await query
//     .orderBy("created_at", "desc")
//     .offset((page - 1) * limit)
//     .limit(limit);

//   const results = [];

//   for (const row of rows) {
//     // Payload passed through directly (large text)
//     results.push({
//       id: row.id,
//       method: row.method,
//       path: row.path,
//       statusCode: row.status_code,
//       responseTimeMs: row.response_time_ms,
//       payload: row.payload,
//       createdAt: row.created_at
//     });
//   }

//   return results;
// }

// Buggy code with console log
function cpuSpike() {
  const start = Date.now();
  while (Date.now() - start < 120) {
    // Busy loop — blocks event loop
  }
}

export async function getApiLogs({ page, limit, path, statusCode }) {
  const start = Date.now();

  let query = db("api_logs");

  if (path) {
    query = query.where("path", "like", `%${path}%`);
  }

  if (statusCode) {
    query = query.where({ status_code: statusCode });
  }

  const rows = await query
    .orderBy("created_at", "desc")
    .offset((page - 1) * limit)
    .limit(limit);

  const results = [];

  for (const row of rows) {
    // 🔥 Rare CPU spike (1 in 10 rows)
    if (Math.random() < 0.1) {
      console.log("[logs][buggy] CPU spike triggered");
      cpuSpike();
    }

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

  console.log(
    "[logs][buggy] getApiLogs took",
    Date.now() - start,
    "ms"
  );

  return results;
}


// // Fixed code with console log
// function cpuHeavyWork(durationMs) {
//   return new Promise(resolve => {
//     const start = Date.now();

//     function workChunk() {
//       if (Date.now() - start >= durationMs) {
//         return resolve();
//       }

//       // Small CPU chunk
//       for (let i = 0; i < 10_000; i++) {}

//       // Yield back to event loop
//       setImmediate(workChunk);
//     }

//     workChunk();
//   });
// }

// export async function getApiLogs({ page, limit, path, statusCode }) {
//   const start = Date.now();

//   let query = db("api_logs");

//   if (path) {
//     query = query.where("path", "like", `%${path}%`);
//   }

//   if (statusCode) {
//     query = query.where({ status_code: statusCode });
//   }

//   const rows = await query
//     .orderBy("created_at", "desc")
//     .offset((page - 1) * limit)
//     .limit(limit);

//   const results = [];

//   for (const row of rows) {
//     if (Math.random() < 0.1) {
//       console.log("[logs][fixed] CPU spike triggered");
//       await cpuHeavyWork(120);
//     }

//     results.push({
//       id: row.id,
//       method: row.method,
//       path: row.path,
//       statusCode: row.status_code,
//       responseTimeMs: row.response_time_ms,
//       payload: row.payload,
//       createdAt: row.created_at
//     });
//   }

//   console.log(
//     "[logs][fixed] getApiLogs took",
//     Date.now() - start,
//     "ms"
//   );

//   return results;
// }



export async function countLogs({ path, statusCode }) {
  let query = db("api_logs");

  if (path) {
    query = query.where("path", "like", `%${path}%`);
  }

  if (statusCode) {
    query = query.where({ status_code: statusCode });
  }

  const [{ count }] = await query.count("* as count");
  return Number(count);
}
