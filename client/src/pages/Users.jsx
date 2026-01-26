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
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Users</h2>
        <p className="dashboard-subtitle">
          Manage and view all registered users
        </p>
      </div>

      {/* Users card */}
      <div className="dashboard-card">
        <ul className="users-list">
          {users.map((user, idx) => (
            <li key={user.id} className="users-list-item users-row">
              <span className="users-col users-col-index">
                {(page - 1) * limit + idx + 1}
              </span>

              <div className="users-col users-col-user user-left">
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
              </div>

              <span className="users-col users-col-email user-email">
                {user.email}
              </span>
            </li>
          ))}
        </ul>


        {/* Pagination */}
        <div className="users-pagination">
          <button
            className="nav-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <span className="pagination-text">
            Page {page} of {totalPages}
          </span>

          <button
            className="nav-btn"
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
