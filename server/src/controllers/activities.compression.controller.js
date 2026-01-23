import compression from "compression";
import { getAllActivities } from "../services/activities.service.js";

export async function getActivitiesUncompressed(req, res, next) {
  try {
    const start = Date.now();
    console.log("[chapter-10][baseline] request started");

    const activities = await getAllActivities();

    console.log(
      "[chapter-10][baseline] payload size (bytes):",
      Buffer.byteLength(JSON.stringify(activities))
    );

    res.json(activities);

    console.log(
      "[chapter-10][baseline] response time:",
      Date.now() - start,
      "ms"
    );
  } catch (err) {
    next(err);
  }
}



// Blind Compression (WITH Console Logs)
const compressAll = compression();

export async function getActivitiesCompressedBuggy(req, res, next) {
  try {
    const start = Date.now();
    console.log("[chapter-10][buggy] request started");

    compressAll(req, res, async () => {
      const activities = await getAllActivities();

      console.log(
        "[chapter-10][buggy] payload size before compression:",
        Buffer.byteLength(JSON.stringify(activities))
      );

      res.json(activities);

      console.log(
        "[chapter-10][buggy] response time:",
        Date.now() - start,
        "ms"
      );
    });
  } catch (err) {
    next(err);
  }
}

// Fixed Code Conditional Compression (WITH Console Logs)
const compressLarge = compression({
  threshold: 1024 // compress only if >1KB
});

export async function getActivitiesCompressedFixed(req, res, next) {
  try {
    const start = Date.now();
    console.log("[chapter-10][fixed] request started");

    compressLarge(req, res, async () => {
      const activities = await getAllActivities();

      const size = Buffer.byteLength(
        JSON.stringify(activities)
      );

      console.log(
        "[chapter-10][fixed] payload size (bytes):",
        size
      );

      res.json(activities);

      console.log(
        "[chapter-10][fixed] response time:",
        Date.now() - start,
        "ms"
      );
    });
  } catch (err) {
    next(err);
  }
}