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

      {users.map(user => (
        <UserRow key={user.id} user={user} />
      ))}

      <Pagination page={page} onChange={setPage} />
    </div>
  );
}
