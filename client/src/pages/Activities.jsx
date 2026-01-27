import { useEffect, useMemo, useRef, useState } from "react";
import { fetchActivities } from "../api/activities.api.js";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchActivities(page, limit).then(res => {
      setActivities(res.data);
      setTotal(res.meta.total);
    });
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Activities</h2>
        <p className="dashboard-subtitle">
          View and manage all learning activities
        </p>
      </div>

      {/* Activities Card */}
      <div className="dashboard-card">
        {/* Header row */}
        <div className="activities-header">
          <span className="activities-col-title">Title</span>
          <span className="activities-col-type">Type</span>
          <span className="activities-col-participants">Participants</span>
        </div>

        {/* Rows */}
        <ul className="activities-list">
          {activities.map(activity => (
            <li key={activity.id} className="activities-row">
              <span className="activities-col-title">
                {activity.title}
              </span>

              <span className="activities-col-type">
                <span className={`activity-type ${activity.type}`}>
                  {activity.type}
                </span>
              </span>

              <span className="activities-col-participants">
                <span className="participants-icon">👤</span>
                {activity.participants}
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
