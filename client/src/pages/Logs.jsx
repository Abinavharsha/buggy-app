import { useEffect, useState } from "react";
import { fetchLogs } from "../api/logs.api.js";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs(1, 50).then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <h2>API Logs</h2>

      {logs.map(log => (
        <pre key={log.id}>{JSON.stringify(log, null, 2)}</pre>
      ))}
    </div>
  );
}
