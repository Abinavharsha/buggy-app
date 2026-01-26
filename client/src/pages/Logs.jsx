import { useEffect, useState } from "react";
import { fetchLogs } from "../api/logs.api.js";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs(1, 20)
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) => {
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Logs</h1>
      <p className="page-subtitle">
        API request logs and response times
      </p>

      <div className="dashboard-card">
        {/* Summary header */}
        <div className="logs-summary">
          <span>{logs.length} requests</span>
          <span className="dot">•</span>
          <span>
            Avg response:{" "}
            {logs.length
              ? Math.round(
                  logs.reduce((a, b) => a + b.responseTimeMs, 0) /
                    logs.length
                )
              : 0}
            ms
          </span>
        </div>

        {loading && <p>Loading logs...</p>}

        {!loading && logs.length === 0 && <p>No logs found.</p>}

        {!loading && logs.length > 0 && (
          <ul className="logs-list">
            {logs.map((log) => (
              <li key={log.id} className="log-item">
                <span className={`log-method ${log.method}`}>
                  {log.method}
                </span>

                <span className="log-path">{log.path}</span>

                <span
                  className={`log-status ${
                    log.statusCode >= 400 ? "error" : "ok"
                  }`}
                >
                  {log.statusCode}
                </span>

                <span
                  className={`log-time ${
                    log.responseTimeMs > 800 ? "slow" : "fast"
                  }`}
                >
                  {log.responseTimeMs} ms
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
