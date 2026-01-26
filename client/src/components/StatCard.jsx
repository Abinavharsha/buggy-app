const ICONS = {
  total: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h18M12 3v18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  completed: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  started: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M8 5v14l11-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
};

export default function StatCard({ title, value, variant = "total", icon }) {
  return (
    <div className={`stat-card stat-${variant}`}>
      <div>
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>

      <div className="stat-icon">
        {icon}
      </div>
    </div>
  );
}

