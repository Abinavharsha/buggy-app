import { useMemo, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api.js";
import StatCard from "../components/StatCard.jsx";
import usePolling from "../hooks/usePolling.js";

const DASHBOARD_ICONS = {
  total: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),

  completed: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),

  started: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
    </svg>
  )
};



export default function Dashboard() {
  const [data, setData] = useState(null);

  usePolling(async () => {
    try {
      const res = await fetchDashboard(1);
      setData(res);
    } catch (err) {
      console.error("[dashboard] fetch failed", err);
    }
  }, 5000);

  // if (!data) return <p>Loading...</p>;

  // let completedCount = 0;
  // let startedCount = 0;

  // for (const activity of data.recentActivities) {
  //   if (activity.action === "completed") completedCount++;
  //   if (activity.action === "started") startedCount++;
  // }

  // Buggy code with console log
  if (!data) return <p>Loading...</p>;

  console.log("[Dashboard] computing derived stats");

  let completedCount = 0;
  let startedCount = 0;

  for (const activity of data.recentActivities) {
    if (activity.action === "completed") completedCount++;
    if (activity.action === "started") startedCount++;
  }

  // // Fixed code with console log
  // const { completedCount, startedCount } = useMemo(() => {
  //   console.log("[Dashboard] computing derived stats");

  //   if (!data || !Array.isArray(data.recentActivities)) {
  //     return { completedCount: 0, startedCount: 0 };
  //   }

  //   let completed = 0;
  //   let started = 0;

  //   for (const activity of data.recentActivities) {
  //     if (activity.action === "completed") completed++;
  //     if (activity.action === "started") started++;
  //   }

  //   return {
  //     completedCount: completed,
  //     startedCount: started
  //   };
  // }, [data]);
  // if (!data) return <p>Loading...</p>;


  // // Fixed code without console log
  // const { completedCount, startedCount } = useMemo(() => {

  //   if (!data || !Array.isArray(data.recentActivities)) {
  //     return { completedCount: 0, startedCount: 0 };
  //   }

  //   let completed = 0;
  //   let started = 0;

  //   for (const activity of data.recentActivities) {
  //     if (activity.action === "completed") completed++;
  //     if (activity.action === "started") started++;
  //   }

  //   return {
  //     completedCount: completed,
  //     startedCount: started
  //   };
  // }, [data]);
  // if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="dashboard-subtitle">
          System overview and recent activity
        </p>
      </div>

      {/* Stat cards */}
      <div className="dashboard-stats">
        <StatCard
          title="Total Activities"
          value={data.summary.total}
          variant="total"
          icon={DASHBOARD_ICONS.total}
        />

        <StatCard
          title="Completed"
          value={completedCount}
          variant="completed"
          icon={DASHBOARD_ICONS.completed}
        />

        <StatCard
          title="Started"
          value={startedCount}
          variant="started"
          icon={DASHBOARD_ICONS.started}
        />
      </div>

      {/* Recent activity / logs */}
      <div className="dashboard-card">
        <h3>Recent Activity</h3>

        <ul className="activity-list">
          {data.recentActivities.map((a, i) => (
            <li key={i} className="activity-item">
              <div className="activity-left">
                <div className="activity-title">{a.title}</div>
                <div className="activity-action">{a.action}</div>
              </div>

              <span className={`activity-status ${a.action}`}>
                {a.action}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}