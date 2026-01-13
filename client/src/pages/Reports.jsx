import { useEffect, useState } from "react";
import { fetchActivitySummaryReport } from "../api/reports.api.js";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchActivitySummaryReport().then((res) => {
      setData(res.data); // ❌ assumes res.data always exists
    });
  }, []);

  return (
    <div className="page">
      <h1>Reports</h1>

      <ul>
        {data.map((row) => (
          <li key={row.type}>
            {row.type} → {row.count}
          </li>
        ))}
      </ul>
    </div>
  );
}
