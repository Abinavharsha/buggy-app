export function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

export function formatCount(value) {
  return typeof value === "number" ? value : 0;
}
