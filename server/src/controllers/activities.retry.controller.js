import { getAllActivities } from "../services/activities.service.js";
import db from "../db/knex.js";

async function unstableFetch() {
  // Simulate flaky downstream
  if (Math.random() < 0.6) {
    throw new Error("Downstream timeout");
  }
  return getAllActivities();
}

// export async function getActivitiesWithRetryBug(req, res, next) {
//   try {
//     let attempts = 0;

//     while (attempts < 5) {
//       try {
//         attempts++;
//         const data = await unstableFetch();
//         return res.json({ attempts, data });
//       } catch (err) {
//       }
//     }

//     res.status(503).json({
//       error: "Service unavailable after retries",
//       attempts
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// // Buggy code with console log
export async function getActivitiesWithRetryBug(req, res, next) {
  try {
    console.log("[chapter-9][buggy] request started");

    let attempts = 0;

    while (attempts < 5) {
      try {
        attempts++;
        console.log(
          "[chapter-9][buggy] attempt:",
          attempts
        );

        const data = await unstableFetch();
        return res.json({ attempts, data });
      } catch (err) {
        console.warn(
          "[chapter-9][buggy] retrying after error:",
          err.message
        );
      }
    }

    res.status(503).json({
      error: "Service unavailable after retries",
      attempts
    });
  } catch (err) {
    next(err);
  }
}


// // CHAPTER-9 FIXED: Exponential backoff + retry cap
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// export async function getActivitiesWithRetryFixed(req, res, next) {
//   try {
//     console.log("[chapter-9][fixed] request started");

//     const maxRetries = 3;
//     let attempt = 0;

//     while (attempt <= maxRetries) {
//       try {
//         console.log(
//           "[chapter-9][fixed] attempt:",
//           attempt + 1
//         );

//         const data = await unstableFetch();
//         return res.json({
//           attempts: attempt + 1,
//           data
//         });
//       } catch (err) {
//         attempt++;

//         if (attempt > maxRetries) {
//           break;
//         }

//         const delay = 2 ** attempt * 100;
//         console.warn(
//           "[chapter-9][fixed] retrying in",
//           delay,
//           "ms"
//         );

//         await sleep(delay);
//       }
//     }

//     res.status(503).json({
//       error: "Service unavailable after controlled retries",
//       attempts: attempt
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// fixed code without console log
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getActivitiesWithRetryFixed(req, res, next) {
  try {
    console.log("[chapter-9][fixed] request started");

    const maxRetries = 3;
    let attempt = 0;

    while (attempt <= maxRetries) {
      try {
        console.log(
          "[chapter-9][fixed] attempt:",
          attempt + 1
        );

        const data = await unstableFetch();
        return res.json({
          attempts: attempt + 1,
          data
        });
      } catch (err) {
        attempt++;

        if (attempt > maxRetries) {
          break;
        }

        const delay = 2 ** attempt * 100;
        console.warn(
          "[chapter-9][fixed] retrying in",
          delay,
          "ms"
        );

        await sleep(delay);
      }
    }

    res.status(503).json({
      error: "Service unavailable after controlled retries",
      attempts: attempt
    });
  } catch (err) {
    next(err);
  }
}