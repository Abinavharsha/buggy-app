import { getActivitySummaryReport } from "../services/reports.service.js";

// export async function getActivitySummary(req, res, next) {
//   try {
//     const { activities, participants } =
//       await getActivitySummaryReport();

//     const result = [];

//     for (const activity of activities) {
//       let count = 0;

//       for (const p of participants) {
//         if (p.activity_id === activity.id) {
//           count++;
//         }
//       }

//       result.push({
//         type: activity.type,
//         count
//       });
//     }

//     res.json({ data: result });
//   } catch (err) {
//     next(err);
//   }
// }


// Buggy code with console log
export async function getActivitySummary(req, res, next) {
  try {
    const start = Date.now();

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

      console.log(
        "[buggy] processed activity",
        activity.id,
        "count:",
        count
      );

      result.push({
        type: activity.type,
        count
      });
    }

    console.log(
      "[buggy] total request time:",
      Date.now() - start,
      "ms"
    );

    res.json({ data: result });
  } catch (err) {
    next(err);
  }
}



// // Fixed code with console log
// export async function getActivitySummary(req, res, next) {
//   try {
//     const start = Date.now();

//     const { activities, participants } =
//       await getActivitySummaryReport();

//     const countMap = new Map();

//     for (const p of participants) {
//       countMap.set(
//         p.activity_id,
//         (countMap.get(p.activity_id) || 0) + 1
//       );
//     }

//     console.log(
//       "[fixed] participant map size:",
//       countMap.size
//     );

//     const result = activities.map(activity => ({
//       type: activity.type,
//       count: countMap.get(activity.id) || 0
//     }));

//     console.log(
//       "[fixed] total request time:",
//       Date.now() - start,
//       "ms"
//     );

//     res.json({ data: result });
//   } catch (err) {
//     next(err);
//   }
// }



// // Fixed code without console log
// export async function getActivitySummary(req, res, next) {
//   try {
//     const { activities, participants } =
//       await getActivitySummaryReport();

//     // One-time aggregation
//     const countMap = new Map();

//     for (const p of participants) {
//       countMap.set(
//         p.activity_id,
//         (countMap.get(p.activity_id) || 0) + 1
//       );
//     }

//     const result = activities.map(activity => ({
//       type: activity.type,
//       count: countMap.get(activity.id) || 0
//     }));

//     res.json({ data: result });
//   } catch (err) {
//     next(err);
//   }
// }
