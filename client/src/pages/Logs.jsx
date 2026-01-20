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

      {loading && <p>Loading logs...</p>}

      {!loading && logs.length === 0 && (
        <p>No logs found.</p>
      )}

      {!loading && logs.length > 0 && (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <strong>{log.method}</strong>{" "}
              {log.path} —{" "}
              <strong>{log.statusCode}</strong>{" "}
              ({log.responseTimeMs} ms)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
