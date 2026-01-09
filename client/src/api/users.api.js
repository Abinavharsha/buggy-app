import { API_BASE_URL } from "./config";

export async function fetchUsers(page = 1, limit = 20) {
  const res = await fetch(
    `${API_BASE_URL}/api/users?page=${page}&limit=${limit}`
  );
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`${API_BASE_URL}/api/users/${id}`);
  return res.json();
}
