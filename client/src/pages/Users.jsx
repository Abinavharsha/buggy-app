import { useEffect, useState } from "react";
import { fetchUsers } from "../api/users.api.js";
import UserRow from "../components/UserRow.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers(page, 20).then(res => setUsers(res.data));
  }, [page]);

  return (
    <div>
      <h2>Users</h2>

      {Array.isArray(users) &&
        users.map(user => (
          <div key={user.id}>{user.name}</div>
        ))
      }

      <Pagination page={page} onChange={setPage} />
    </div>
  );
}
