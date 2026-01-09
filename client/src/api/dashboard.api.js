import { API_BASE_URL } from "./config";

export async function fetchDashboard(userId) {
  const res = await fetch(
    `${API_BASE_URL}/api/dashboard?userId=${userId}`
  );
  return res.json();
}
