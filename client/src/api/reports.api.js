import { API_BASE_URL } from "./config";

export async function fetchActivitySummaryReport() {
  const res = await fetch(
    `${API_BASE_URL}/api/reports/activity-summary`
  );
  return res.json();
}
