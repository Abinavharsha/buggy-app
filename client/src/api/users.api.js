import { API_BASE_URL } from "./config";

export async function fetchUsers(page = 1, limit = 20, status) {
  let url = `${API_BASE_URL}/api/users?page=${page}&limit=${limit}`;

  if (status) {
    url += `&status=${status}`;
  }

  const res = await fetch(url);
  return res.json();
}
