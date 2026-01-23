import { getAllActivities } from "../services/activities.service.js";
import db from "../db/knex.js";

// export async function getActivitiesBulk(req, res, next) {
//   try {
//     const activities = await getAllActivities();

//     res.json(activities);

//   } catch (err) {
//     next(err);
//   }
// }


// Bulk controller with console logs
export async function getActivitiesBulk(req, res, next) {
  try {
    const start = Date.now();
    console.log("[chapter-8][buggy] request started");

    const activities = await getAllActivities();

    console.log(
      "[chapter-8][buggy] rows fetched:",
      activities.length
    );

    console.log(
      "[chapter-8][buggy] time before send:",
      Date.now() - start,
      "ms"
    );

    res.json(activities);

    console.log(
      "[chapter-8][buggy] response sent in:",
      Date.now() - start,
      "ms"
    );
  } catch (err) {
    next(err);
  }
}

// // console log version of stream controller
// export async function getActivitiesStream(req, res, next) {
//   try {
//     const start = Date.now();
//     console.log("[chapter-8][stream] request started");

//     res.setHeader("Content-Type", "application/json");

//     // Start JSON array
//     res.write("[");
//     let first = true;
//     let count = 0;

//     const stream = db("activities")
//       .select("id", "title", "type")
//       .orderBy("id")
//       .stream();

//     stream.on("data", row => {
//       if (!first) res.write(",");
//       first = false;

//       res.write(JSON.stringify(row));
//       count++;

//       // Show time-to-first-byte
//       if (count === 1) {
//         console.log(
//           "[chapter-8][stream] first row sent after:",
//           Date.now() - start,
//           "ms"
//         );
//       }
//     });

//     stream.on("end", () => {
//       res.write("]");
//       res.end();

//       console.log(
//         "[chapter-8][stream] rows streamed:",
//         count
//       );
//       console.log(
//         "[chapter-8][stream] total time:",
//         Date.now() - start,
//         "ms"
//       );
//     });

//     stream.on("error", err => {
//       next(err);
//     });
//   } catch (err) {
//     next(err);
//   }
// }


// stream controller without console logs
export async function getActivitiesStream(req, res, next) {
  try {
    res.setHeader("Content-Type", "application/json");

    res.write("[");
    let first = true;

    const stream = db("activities")
      .select("id", "title", "type")
      .orderBy("id")
      .stream();

    stream.on("data", row => {
      if (!first) res.write(",");
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