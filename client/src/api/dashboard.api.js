import { API_BASE_URL } from "./config";

export async function fetchDashboard(userId) {
  const res = await fetch(
    `${API_BASE_URL}/api/dashboard?userId=${userId}`
  );
  return res.json();
}

/* Fetch ONLY summary (fast, small payload) */
export async function fetchDashboardSummary(userId) {
  const res = await fetch(`${API_BASE_URL}/api/dashboard?userId=${userId}`);
  const data = await res.json();
  return data.summary;
}

/* Fetch recent activity ONLY when needed */
export async function fetchRecentActivities(userId) {
  const res = await fetch(`${API_BASE_URL}/api/dashboard?userId=${userId}`);
  const data = await res.json();
  return data.recentActivities;
}
