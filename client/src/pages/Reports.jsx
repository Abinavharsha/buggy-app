import { useState } from "react";
import { exportReport } from "../api/reports.api.js";

export default function Reports() {
  const [result, setResult] = useState(null);

  async function handleExport() {
    const res = await exportReport();
    setResult(res.data);
  }

  return (
    <div>
      <h2>Reports</h2>
      <button onClick={handleExport}>Export</button>

      {result && <p>Exported {result.length} rows</p>}
    </div>
  );
}
