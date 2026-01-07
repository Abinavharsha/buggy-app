export async function fetchDashboard(userId) {
  const res = await fetch(`/api/dashboard?userId=${userId}`);
  return res.json();
}
