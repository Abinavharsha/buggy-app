import { API_BASE_URL } from "./config";

export async function fetchUsers(page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE_URL}/api/users?page=${page}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json(); // { data, meta }
}
