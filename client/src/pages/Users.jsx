import { useEffect, useState } from "react";
import { fetchUsers } from "../api/users.api.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers(1, 20)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Users</h1>

      {loading && <p>Loading users...</p>}

      {!loading && users.length === 0 && (
        <p>No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name || user.email || JSON.stringify(user)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
