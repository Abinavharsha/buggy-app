import { getAllActivities } from "../services/activities.service.js";
import db from "../db/knex.js";

// export async function exportActivities(req, res, next) {
//   try {
//     const activities = await getAllActivities();
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=activities.json"
//     );
//     res.json(activities);
//   } catch (err) {
//     next(err);
//   }
// }



// // buggy code with console log
// export async function exportActivities(req, res, next) {
//   try {
//     console.log("[chapter-7][buggy] starting export");
//     const activities = await getAllActivities();

//     console.log(
//       "[chapter-7][buggy] rows fetched:",
//       activities.length
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=activities.json"
//     );
//     res.json(activities);
//   } catch (err) {
//     next(err);
//   }
// }

// // fixed code with console log
// export async function exportActivities(req, res, next) {
//   try {
//     console.log("[chapter-7][fixed] starting streaming export");

//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=activities.json"
//     );
//     res.setHeader("Content-Type", "application/json");

//     // Start JSON array
//     res.write("[");

//     let first = true;

//     // Stream rows from DB
//     const stream = db("activities")
//       .select("id", "title", "type")
//       .orderBy("id")
//       .stream();

//     stream.on("data", row => {
//       if (!first) {
//         res.write(",");
//       }
//       first = false;

//       res.write(JSON.stringify(row));
//     });

//     stream.on("end", () => {
//       res.write("]");
//       res.end();
//       console.log("[chapter-7][fixed] export complete");
//     });

//     stream.on("error", err => {
//       next(err);
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// fixed code without console log
export async function exportActivities(req, res, next) {
  try {
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=activities.json"
    );
    res.setHeader("Content-Type", "application/json");

    // Start JSON array
    res.write("[");

    let first = true;

    // Stream rows from DB
    const stream = db("activities")
      .select("id", "title", "type")
      .orderBy("id")
      .stream();

    stream.on("data", row => {
      if (!first) {
        res.write(",");
      }
      first = false;

      res.write(JSON.stringify(row));
    });

    stream.on("end", () => {
      res.write("]");
      res.end();
    });

    stream.on("error", err => {
      next(err);
    });
  } catch (err) {
    next(err);
  }
}