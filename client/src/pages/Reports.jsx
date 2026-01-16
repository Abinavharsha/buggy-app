import { useEffect, useMemo, useState } from "react";
import { fetchActivitySummaryReport } from "../api/reports.api.js";

export default function Reports() {
  const [data, setData] = useState([]);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    fetchActivitySummaryReport().then((res) => {
      setData(res.data);
    });
  }, []);

  // UI-side aggregation (presentation only)
  const summary = useMemo(() => {
    const map = new Map();

    for (const row of data) {
      map.set(row.type, (map.get(row.type) || 0) + row.count);
    }

    return Array.from(map.entries()).map(([type, count]) => ({
      type,
      count
    }));
  }, [data]);

  return (
    <div className="page">
      <h1>Reports</h1>

      {/* Clean summary */}
      <div style={{ marginBottom: "16px" }}>
        <h3>Summary</h3>
        <ul>
          {summary.map((row) => (
            <li key={row.type}>
              <strong>{row.type}</strong> → {row.count}
            </li>
          ))}
        </ul>
      </div>

      {/* Optional teaching toggle */}
      <button
        onClick={() => setShowRaw((v) => !v)}
        style={{ marginBottom: "12px" }}
      >
        {showRaw ? "Hide Raw Data" : "Show Raw Data"}
      </button>

      {/* Raw backend output (for teaching) */}
      {showRaw && (
        <>
          <h3>Raw Output (Buggy Backend)</h3>
          <ul style={{ maxHeight: "300px", overflowY: "auto" }}>
            {data.map((row, index) => (
              <li key={index}>
                {row.type} → {row.count}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
