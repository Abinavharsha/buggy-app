import {
  getUsers,
  getUserById,
  getUserActivities
} from "../services/users.service.js";

export async function listUsers(req, res, next) {
  const start = Date.now();

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status;

    const users = await getUsers({ page, limit, status });

    const duration = Date.now() - start;

    res.status(200).json({
      data: users,
      meta: {
        page,
        limit,
        responseTimeMs: duration
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const userId = Number(req.params.id);

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const activities = await getUserActivities(userId);

    res.status(200).json({
      data: {
        user,
        activities
      }
    });
  } catch (err) {
    next(err);
  }
}
