import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/dashboard.api.js";
import StatCard from "../components/StatCard.jsx";
import usePolling from "../hooks/usePolling.js";

// export default function Dashboard() {
//   const [data, setData] = useState(null);

//   usePolling(async () => {
//     try {
//       const res = await fetchDashboard(1);

//       // Hard validation
//       if (
//         !res ||
//         typeof res !== "object" ||
//         !res.summary ||
//         !res.recentActivities ||
//         !res.stats
//       ) {
//         console.warn("[dashboard] invalid payload", res);
//         return; // DO NOT update state
//       }

//       setData(res);
//     } catch (err) {
//       console.error("[dashboard] fetch failed", err);
//     }
//   }, 5000);
//   // polling every 5s (intentional)

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Dashboard</h2>

//       <div>
//         <StatCard title="Total" value={data.summary.total} />
//         <StatCard title="Completed" value={data.summary.completed} />
//         <StatCard title="Started" value={data.summary.started} />
//       </div>

//       <ul>
//         {data.recentActivities.map((a, i) => (
//           <li key={i}>
//             {a.title} - {a.action}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// // Buggy code with console log
// export default function Dashboard() {
//   const [data, setData] = useState(null);

//   console.log("[render] Dashboard rendered");

//   usePolling(async () => {
//     console.log("[fetch] dashboard fetch called");
//     const res = await fetchDashboard(1);
//     setData(res); // replaces entire object every poll
//   }, 5000);

//   if (!data || !data.summary) return <p>Loading...</p>;

//   return (
//     <div>
//       <StatCard title="Total" value={data.summary.total} />
//       <StatCard title="Completed" value={data.summary.completed} />
//       <StatCard title="Started" value={data.summary.started} />

//       <ul>
//         {data.recentActivities.map(a => (
//           <li key={a.activityId}>{a.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // Fixed code with Console Logs
// export default function Dashboard() {
//   const [summary, setSummary] = useState(null);
//   const [activities, setActivities] = useState([]);

//   console.log("[render] Dashboard rendered");

//   usePolling(async () => {
//     console.log("[fetch] dashboard fetch called");
//     const res = await fetchDashboard(1);

//     // shallow comparison
//     if (
//       !summary ||
//       summary.total !== res.summary.total ||
//       summary.completed !== res.summary.completed
//     ) {
//       console.log("[state] updating summary");
//       setSummary(res.summary);
//     }

//     if (activities.length !== res.recentActivities.length) {
//       console.log("[state] updating activities");
//       setActivities(res.recentActivities);
//     }
//   }, 5000);

//   if (!summary) return <p>Loading...</p>;

//   return (
//     <div>
//       <StatCard title="Total" value={summary.total} />
//       <StatCard title="Completed" value={summary.completed} />
//       <StatCard title="Started" value={summary.started} />

//       <ul>
//         {activities.map(a => (
//           <li key={a.activityId}>{a.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// Fixed code without Console Logs
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [activities, setActivities] = useState([]);

  usePolling(async () => {
    const res = await fetchDashboard(1);

    // shallow comparison
    if (
      !summary ||
      summary.total !== res.summary.total ||
      summary.completed !== res.summary.completed
    ) {
      setSummary(res.summary);
    }

    if (activities.length !== res.recentActivities.length) {
      setActivities(res.recentActivities);
    }
  }, 5000);

  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <StatCard title="Total" value={summary.total} />
      <StatCard title="Completed" value={summary.completed} />
      <StatCard title="Started" value={summary.started} />

      <ul>
        {activities.map(a => (
          <li key={a.activityId}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}
