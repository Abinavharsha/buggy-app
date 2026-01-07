export async function exportReport(from, to) {
  let url = `/api/reports/export`;

  const params = [];
  if (from) params.push(`from=${from}`);
  if (to) params.push(`to=${to}`);

  if (params.length) {
    url += `?${params.join("&")}`;
  }

  const res = await fetch(url);
  return res.json();
}
