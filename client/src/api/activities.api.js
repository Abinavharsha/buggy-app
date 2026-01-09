import { API_BASE_URL } from "./config";

export async function fetchActivities(page = 1, limit = 20, type) {
  let url = `${API_BASE_URL}/api/activities?page=${page}&limit=${limit}`;
  if (type) {
    url += `&type=${type}`;
  }

  const res = await fetch(url);
  return res.json();
}

export async function fetchActivityById(id) {
  const res = await fetch(`${API_BASE_URL}/api/activities/${id}`);
  return res.json();
}
