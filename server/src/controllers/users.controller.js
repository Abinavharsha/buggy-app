import {
  getUsers,
  getUserById,
  getUserActivities
} from "../services/users.service.js";

export async function getUsersList(req, res, next) {

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const status = req.query.status;

    const users = await getUsers({ page, limit, status });

    res.status(200).json({
      data: users,
      meta: { page, limit }
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

    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
}

export async function getUserActivityList(req, res, next) {
  try {
    const userId = Number(req.params.id);

    const activities = await getUserActivities(userId);

    res.status(200).json({
      data: activities
    });
  } catch (err) {
    next(err);
  }
}
