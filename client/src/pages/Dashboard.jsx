import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api.js";
import StatCard from "../components/StatCard.jsx";
import usePolling from "../hooks/usePolling.js";

export default function Dashboard() {
  const [data, setData] = useState(null);

  usePolling(async () => {
    const res = await fetchDashboard(1);
    setData(res.data);
  }, 5000); // polling every 5s (intentional)

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
