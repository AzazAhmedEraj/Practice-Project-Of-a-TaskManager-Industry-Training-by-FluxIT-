interface Stats {
  total: number;
  completed: number;
  percentage: number;
  highPriority: number;
}

interface Props {
  stats: Stats;
}

export default function StatsPanel({ stats }: Props) {
  return (
    <div className="stats-panel">
      <div className="stat-card">
        <span className="stat-number">{stats.total}</span>
        <span className="stat-label">Total Tasks</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{stats.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{stats.percentage}%</span>
        <span className="stat-label">Completion</span>
      </div>
      <div className="stat-card high">
        <span className="stat-number">{stats.highPriority}</span>
        <span className="stat-label">High Priority</span>
      </div>
    </div>
  );
}