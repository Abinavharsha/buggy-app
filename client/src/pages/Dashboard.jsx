import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api.js";
import StatCard from "../components/StatCard.jsx";
import usePolling from "../hooks/usePolling.js";

export default function Dashboard() {
  const [data, setData] = useState(null);

  usePolling(async () => {
    try {
      const res = await fetchDashboard(1);

      // Hard validation
      if (
        !res ||
        typeof res !== "object" ||
        !res.summary ||
        !res.recentActivities ||
        !res.stats
      ) {
        console.warn("[dashboard] invalid payload", res);
        return;
      }

      setData(res);
    } catch (err) {
      console.error("[dashboard] fetch failed", err);
    }
  }, 5000); // polling every 5s (intentional)

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h2>Dashboard</h2>

      {/* Stat cards */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px",
          marginBottom: "24px"
        }}
      >
        <StatCard title="Total" value={data.summary.total} />
        <StatCard title="Completed" value={data.summary.completed} />
        <StatCard title="Started" value={data.summary.started} />
      </div>

      {/* Recent activities */}
      <div>
        <h3>Recent Activity</h3>

        <ul style={{ paddingLeft: "16px" }}>
          {data.recentActivities.map((a, i) => (
            <li key={i} style={{ marginBottom: "6px" }}>
              <strong>{a.title}</strong> — {a.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
