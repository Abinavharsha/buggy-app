export async function fetchLogs(page = 1, limit = 50) {
  const res = await fetch(`/api/logs?page=${page}&limit=${limit}`);
  return res.json();
}
