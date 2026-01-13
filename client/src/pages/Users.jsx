import { useEffect, useState } from "react";
import { fetchUsers } from "../api/users.api.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchUsers(page, limit).then(res => {
      setUsers(res.data);
      setTotal(res.meta.total);
    });
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
      >
        Prev
      </button>

      <span> Page {page} of {totalPages} </span>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage(p => p + 1)}
      >
        Next
      </button>
    </div>
  );
}
