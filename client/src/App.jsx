import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import Activities from "./pages/Activities.jsx";
import Reports from "./pages/Reports.jsx";
import Logs from "./pages/Logs.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("users")}>Users</button>
        <button onClick={() => setPage("activities")}>Activities</button>
        <button onClick={() => setPage("reports")}>Reports</button>
        <button onClick={() => setPage("logs")}>Logs</button>
      </nav>

      {page === "dashboard" && <Dashboard />}
      {page === "users" && <Users />}
      {page === "activities" && <Activities />}
      {page === "reports" && <Reports />}
      {page === "logs" && <Logs />}
    </div>
  );
}
