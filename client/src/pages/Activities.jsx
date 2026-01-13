import { useEffect, useState } from "react";
import { fetchActivities } from "../api/activities.api.js";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchActivities(page, limit).then(res => {
      setActivities(res.data);
      setTotal(res.meta.total);
    });
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h1>Activities</h1>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th align="left">Title</th>
            <th align="left">Type</th>
            <th align="right">Participants</th>
          </tr>
        </thead>

        <tbody>
          {activities.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.type}</td>
              <td align="right">{a.participantCount}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
        Prev
      </button>

      <span style={{ margin: "0 8px" }}>
        Page {page} of {totalPages}
      </span>

      <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}
