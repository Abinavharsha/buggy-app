import { API_BASE_URL } from "./config";

export async function fetchLogs(page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE_URL}/api/logs?page=${page}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch logs");
  }

  const json = await res.json();

  if (Array.isArray(json.data)) {
    return json;
  }

  if (Array.isArray(json)) {
    return { data: json };
  }

  return { data: [] };
}
