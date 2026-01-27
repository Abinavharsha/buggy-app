import { useEffect, useMemo, useRef, useState } from "react";
import { fetchActivities } from "../api/activities.api.js";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;
  const MAX_DOM_ROWS = 30;

  useEffect(() => {
    fetchActivities(page, limit).then(res => {
      setActivities(res.data);
      setTotal(res.meta.total);
    });
  }, [page]);

  // // Buggy version console log
  // console.log(
  //   "[Activities][buggy] DOM rows rendered:",
  //   activities.length
  // );

  // // Fixed code with console log
  // const visibleActivities = useMemo(() => {
  //   return activities.slice(0, MAX_DOM_ROWS);
  // }, [activities]);

  // console.log(
  //   "[Activities][fixed] total data:",
  //   activities.length
  // );

  // console.log(
  //   "[Activities][fixed] DOM rows rendered:",
  //   visibleActivities.length
  // );


  // Fixed code without console log
  const visibleActivities = useMemo(() => {
    return activities.slice(0, MAX_DOM_ROWS);
  }, [activities]);

  const totalPages = Math.ceil(activities.length / limit);

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
          {visibleActivities.map(activity => (
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
