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
        return; // DO NOT update state
      }

      setData(res);
    } catch (err) {
      console.error("[dashboard] fetch failed", err);
    }
  }, 5000);
  // polling every 5s (intentional)

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <StatCard title="Total" value={data.summary.total} />
        <StatCard title="Completed" value={data.summary.completed} />
        <StatCard title="Started" value={data.summary.started} />
      </div>

      <ul>
        {data.recentActivities.map((a, i) => (
          <li key={i}>
            {a.title} - {a.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
