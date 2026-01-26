import { useEffect, useMemo, useState } from "react";
import { fetchActivitySummaryReport } from "../api/reports.api.js";
import StatCard from "../components/StatCard.jsx";

export default function Reports() {
  const [data, setData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    fetchActivitySummaryReport().then((res) => {
      setData(res.data);
    });
  }, []);

  // UI-side aggregation (presentation only)
  const summary = useMemo(() => {
    const map = new Map();

    for (const row of data) {
      map.set(row.type, (map.get(row.type) || 0) + row.count);
    }

    return Array.from(map.entries()).map(([type, count]) => ({
      type,
      count
    }));
  }, [data]);

  // Derived stats
  const totalQuizzes =
    summary.find((s) => s.type === "quiz")?.count || 0;

  const totalLessons =
    summary.find((s) => s.type === "lesson")?.count || 0;

  const totalActivities = summary.reduce(
    (sum, s) => sum + s.count,
    0
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Reports</h2>
        <p className="dashboard-subtitle">
          Activity summary and analytics
        </p>
      </div>

      {/* Stat cards */}
      <div className="dashboard-stats">
        <StatCard
          title="Total Quizzes"
          value={totalQuizzes}
          variant="total"
          icon="❓"
        />

        <StatCard
          title="Total Lessons"
          value={totalLessons}
          variant="completed"
          icon="📘"
        />

        <StatCard
          title="Total Activities"
          value={totalActivities}
          variant="started"
          icon="▶️"
        />

      </div>

      {/* Activity distribution (no chart yet) */}
      <div className="dashboard-card">
        <h3>Activity Distribution</h3>
        <p className="card-subtitle">
          Breakdown of activity types
        </p>

        <ul className="activity-distribution-list">
          {summary.map((row) => (
            <li key={row.type} className="distribution-row">
              <span className="distribution-type">
                {row.type}
              </span>
              <span className="distribution-count">
                {row.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Teaching toggle */}
      <div style={{ marginTop: "24px" }}>
        <button
          className="nav-btn"
          onClick={() => setShowRaw((v) => !v)}
        >
          {showRaw ? "Hide Raw Data" : "Show Raw Data"}
        </button>
      </div>

      {/* Raw backend output (for teaching) */}
      {showRaw && (
        <div className="dashboard-card" style={{ marginTop: "16px" }}>
          <h3>Raw Output (Buggy Backend)</h3>
          <ul style={{ maxHeight: "300px", overflowY: "auto" }}>
            {data.map((row, index) => (
              <li key={index}>
                {row.type} → {row.count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
