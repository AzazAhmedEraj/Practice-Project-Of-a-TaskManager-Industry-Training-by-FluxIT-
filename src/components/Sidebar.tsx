import { Project } from "../types";

interface Props {
  projects: Project[];
  selectedProjectId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ projects, selectedProjectId, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>📁 Projects</h2>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li
            key={project.id}
            className={`project-item ${
              project.id === selectedProjectId ? "active" : ""
            }`}
            onClick={() => onSelect(project.id)}
          >
            <span className="project-name">{project.name}</span>
            <span className="project-desc">{project.description}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}