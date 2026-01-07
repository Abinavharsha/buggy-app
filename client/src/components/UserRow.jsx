export default function UserRow({ user }) {
  return (
    <div>
      <strong>{user.name}</strong> ({user.email}) – {user.activityCount}
    </div>
  );
}
