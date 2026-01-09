import { API_BASE_URL } from "./config";

export async function fetchLogs(page = 1, limit = 50) {
  const res = await fetch(
    `${API_BASE_URL}/api/logs?page=${page}&limit=${limit}`
  );
  return res.json();
}
