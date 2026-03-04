import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";
import Filters from "./components/Filters";
import StatsPanel from "./components/StatsPanel";
import { useProjectData } from "./hooks/useProjectData";
import "./App.css";

function App() {
  const {
    projects,
    filteredTasks,
    selectedProjectId,
    setSelectedProjectId,
    filters,
    setFilters,
    stats,
    updateTaskStatus,
  } = useProjectData();

  return (
    <div className="app-layout">
      <Sidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelect={setSelectedProjectId}
      />
      <main className="main-content">
        <StatsPanel stats={stats} />
        <Filters filters={filters} onChange={setFilters} />
        <TaskBoard tasks={filteredTasks} onStatusChange={updateTaskStatus} />
      </main>
    </div>
  );
}

export default App;