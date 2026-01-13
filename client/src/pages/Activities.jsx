import { useEffect, useState } from "react";
import { fetchActivities } from "../api/activities.api.js";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities(1, 20)
      .then((res) => {
        setActivities(res.data);
      })
      .catch((err) => {
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h1>Activities</h1>

      {loading && <p>Loading activities...</p>}

      {!loading && activities.length === 0 && (
        <p>No activities found.</p>
      )}

      {!loading && activities.length > 0 && (
        <div className="activity-table">
          <div className="activity-header">
            <span>Activity</span>
            <span>Type</span>
            <span>Participants</span>
          </div>

          {activities.map((activity) => (
            <div key={activity.id} className="activity-row">
              <span>{activity.title}</span>
              <span>{activity.type}</span>
              <span>{activity.participantCount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
