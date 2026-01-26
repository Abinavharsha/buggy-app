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
      <header className="app-header">
        <div className="header-left">
          <img
            src="https://topos.azureedge.net/topos-icons/global/tgtlogo.png"
            alt="TGT Logo"
            className="org-logo"
          />

          <div className="org-info">
            <div className="org-name">Performance Lab</div>
            <div className="org-subtitle">System Dashboard</div>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={page === "dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={page === "users" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("users")}
          >
            Users
          </button>

          <button
            className={page === "activities" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("activities")}
          >
            Activities
          </button>

          <button
            className={page === "reports" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("reports")}
          >
            Reports
          </button>

          <button
            className={page === "logs" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("logs")}
          >
            Logs
          </button>
        </nav>
      </header>


      {page === "dashboard" && <Dashboard />}
      {page === "users" && <Users />}
      {page === "activities" && <Activities />}
      {page === "reports" && <Reports />}
      {page === "logs" && <Logs />}
    </div>
  );
}
