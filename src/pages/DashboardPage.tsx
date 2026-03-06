// DashboardPage.tsx
// Fix #6: Admin area only has Logout + View Only Mode buttons (no Home).
//         Viewer mode has Home button.
//         Admin-preview (viewing as viewer) has "Back to Eraj's Area".

import { useAuth } from "../context/AuthContext";
import { useProjectData } from "../hooks/useProjectData";
import Sidebar from "../components/Sidebar";
import TaskBoard from "../components/TaskBoard";
import FiltersPanel from "../components/Filters";
import StatsPanel from "../components/StatsPanel";
import "./DashboardPage.css";

interface Props {
  isAdmin: boolean;
  onSwitchToViewMode?: () => void;
  onBackToAdmin?: () => void;
  onGoHome: () => void;
  onLogout?: () => void;
}

export default function DashboardPage({
  isAdmin,
  onSwitchToViewMode,
  onBackToAdmin,
  onGoHome,
  onLogout,
}: Props) {
  const { logout } = useAuth();

  const {
    projects,
    filteredTasks,
    selectedProjectId,
    setSelectedProjectId,
    filters,
    setFilters,
    stats,
    addProject,
    editProject,
    deleteProject,
    addTask,
    editTask,
    updateTaskStatus,
    deleteTask,
  } = useProjectData();

  function handleLogout() {
    logout();
    if (onLogout) onLogout();
  }

  // Fix #6: determine if this is admin-preview mode
  // (viewer mode launched FROM admin, not from landing)
  const isAdminPreview = !isAdmin && !!onBackToAdmin;
  // Pure viewer (came from landing "View Projects")
  const isPureViewer = !isAdmin && !onBackToAdmin;

  return (
    <div className="dashboard-page">
      {/* ── Top Action Bar ────────────────────────────────── */}
      <div className="dashboard-topbar">
        <div className="dashboard-mode-label">
          <div className={`mode-dot ${isAdmin ? "admin" : "view"}`} />
          <span className={`mode-label-text ${isAdmin ? "admin" : "view"}`}>
            {isAdmin ? "⬡ Admin Mode — Full Control" : "◈ View Only Mode — Read Only"}
          </span>
        </div>

        <div className="topbar-actions">
          {/* ADMIN MODE: only View Only + Logout. No Home button. */}
          {isAdmin && (
            <>
              <button className="topbar-btn view-mode" onClick={onSwitchToViewMode}>
                ◈ View Only Mode
              </button>
              <button className="topbar-btn logout" onClick={handleLogout}>
                ⏻ Logout
              </button>
            </>
          )}

          {/* ADMIN PREVIEW: Back to Eraj's Area only */}
          {isAdminPreview && (
            <button className="topbar-btn back" onClick={onBackToAdmin}>
              ← Back to Eraj's Area
            </button>
          )}

          {/* PURE VIEWER (from landing): show Home */}
          {isPureViewer && (
            <button className="topbar-btn home" onClick={onGoHome}>
              ⌂ Home
            </button>
          )}
        </div>
      </div>

      {/* ── Dashboard Body ───────────────────────────────── */}
      <div className="dashboard-body">
        <Sidebar
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelect={setSelectedProjectId}
          isAdmin={isAdmin}
          onAdd={isAdmin ? addProject : undefined}
          onEdit={isAdmin ? editProject : undefined}
          onDelete={isAdmin ? deleteProject : undefined}
        />

        <main className="dashboard-main">
          <StatsPanel stats={stats} />
          {/* Fix #4: FiltersPanel no longer shows "FILTER" label text */}
          <FiltersPanel filters={filters} onChange={setFilters} />
          <TaskBoard
            tasks={filteredTasks}
            isAdmin={isAdmin}
            onStatusChange={updateTaskStatus}
            onAddTask={isAdmin ? addTask : undefined}
            onEditTask={isAdmin ? editTask : undefined}
            onDeleteTask={isAdmin ? deleteTask : undefined}
          />
        </main>
      </div>
    </div>
  );
}
