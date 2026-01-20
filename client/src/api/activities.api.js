import { API_BASE_URL } from "./config";

/**
 * Fetch paginated activities
 * Always returns a predictable object:
 * { data: [], page, total }
 */
export async function fetchActivities(page = 1, limit = 20, type) {
  let url = `${API_BASE_URL}/api/activities?page=${page}&limit=${limit}`;
  if (type) {
    url += `&type=${type}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch activities (${res.status})`);
  }

  const json = await res.json();

  // Normalize response shape
  if (Array.isArray(json)) {
    return { data: json };
  }

  if (Array.isArray(json.data)) {
    return json;
  }

  if (Array.isArray(json.activities)) {
    return { data: json.activities };
  }

  return { data: [] };
}

/**
 * Fetch a single activity by ID
 */
export async function fetchActivityById(id) {
  const res = await fetch(`${API_BASE_URL}/api/activities/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch activity (${res.status})`);
  }
  return await res.json();
}
