export async function fetchUsers(page = 1, limit = 20) {
  const res = await fetch(`/api/users?page=${page}&limit=${limit}`);
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
