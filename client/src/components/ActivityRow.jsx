export default function ActivityRow({ activity }) {
  return (
    <div>
      <strong>{activity.title}</strong>
      <div>Type: {activity.type}</div>
      <div>Participants: {activity.participantCount}</div>
    </div>
  );
}
