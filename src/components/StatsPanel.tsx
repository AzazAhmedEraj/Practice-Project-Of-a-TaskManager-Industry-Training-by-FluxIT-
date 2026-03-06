import { ProjectStats } from "../types";
import "./StatsPanel.css";

interface Props { stats: ProjectStats; }

export default function StatsPanel({ stats }: Props) {
  return (
    <div className="stats-panel">
      <div className="stat-card total" style={{animationDelay:"0s"}}>
        <div className="stat-number">{stats.total}</div>
        <div className="stat-label">Total Tasks</div>
        <div className="stat-sub">in this project</div>
      </div>
      <div className="stat-card completed" style={{animationDelay:"0.05s"}}>
        <div className="stat-number">{stats.completed}</div>
        <div className="stat-label">Completed</div>
        <div className="stat-progress-bar"><div className="stat-progress-fill" style={{width:`${stats.percentage}%`}} /></div>
        <div className="stat-sub">{stats.percentage}% done</div>
      </div>
      <div className="stat-card progress" style={{animationDelay:"0.1s"}}>
        <div className="stat-number">{stats.inProgress}</div>
        <div className="stat-label">In Progress</div>
        <div className="stat-sub">active tasks</div>
      </div>
      <div className="stat-card high" style={{animationDelay:"0.15s"}}>
        <div className="stat-number">{stats.highPriority}</div>
        <div className="stat-label">High Priority</div>
        <div className="stat-sub">need attention</div>
      </div>
    </div>
  );
}
