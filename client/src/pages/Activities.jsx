import { useEffect, useState } from "react";
import { fetchActivities } from "../api/activities.api.js";

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities(1, 20).then(res => {
      setActivities(Array.isArray(res.data) ? res.data : []);
    });

  }, []);

  return (
    <div>
      <h2>Activities</h2>

      {activities.map(a => (
        <div key={a.id}>
          <h4>{a.title}</h4>
          <p>{a.description}</p>
        </div>
      ))}
    </div>
  );
}
