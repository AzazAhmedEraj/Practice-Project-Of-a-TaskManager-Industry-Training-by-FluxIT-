// Sidebar.tsx
// Fix #3: Shows max 5 projects then "See More" button

import { useState } from "react";
import { Project } from "../types";
import "./Sidebar.css";

const PROJECT_VISIBLE_LIMIT = 5;

interface Props {
  projects: Project[];
  selectedProjectId: string;
  onSelect: (id: string) => void;
  isAdmin?: boolean;
  onAdd?: (name: string, desc: string) => void;
  onEdit?: (id: string, name: string, desc: string) => void;
  onDelete?: (id: string) => void;
}

export default function Sidebar({
  projects,
  selectedProjectId,
  onSelect,
  isAdmin = false,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [addName, setAddName] = useState("");
  const [addDesc, setAddDesc] = useState("");
  // Fix #3: expand/collapse project list
  const [expanded, setExpanded] = useState(false);

  function startEdit(p: Project) {
    setEditingId(p.id);
    setEditName(p.name);
    setEditDesc(p.description);
  }

  function confirmEdit() {
    if (editingId && editName.trim() && onEdit) {
      onEdit(editingId, editName.trim(), editDesc.trim());
    }
    setEditingId(null);
  }

  function confirmAdd() {
    if (addName.trim() && onAdd) {
      onAdd(addName.trim(), addDesc.trim());
      setAddName("");
      setAddDesc("");
      setShowAdd(false);
    }
  }

  const hasMore = projects.length > PROJECT_VISIBLE_LIMIT;
  const visibleProjects = expanded ? projects : projects.slice(0, PROJECT_VISIBLE_LIMIT);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">◈ Projects</span>
        {isAdmin && (
          <button
            className="sidebar-add-btn"
            onClick={() => setShowAdd(!showAdd)}
            title="Add new project"
          >
            +
          </button>
        )}
      </div>

      {isAdmin && showAdd && (
        <div style={{ padding: "12px", borderBottom: "1px solid var(--border-dim)" }}>
          <InlineForm
            namePlaceholder="Project name..."
            descPlaceholder="Description..."
            nameValue={addName}
            descValue={addDesc}
            onNameChange={setAddName}
            onDescChange={setAddDesc}
            onConfirm={confirmAdd}
            onCancel={() => setShowAdd(false)}
          />
        </div>
      )}

      <ul className="project-list">
        {projects.length === 0 && (
          <li className="sidebar-empty">
            {isAdmin ? "Add a project to begin" : "No projects yet"}
          </li>
        )}

        {visibleProjects.map((project, i) => (
          <li
            key={project.id}
            className={`project-item ${project.id === selectedProjectId ? "active" : ""}`}
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => {
              if (editingId !== project.id) onSelect(project.id);
            }}
          >
            {editingId === project.id ? (
              <InlineForm
                namePlaceholder="Project name..."
                descPlaceholder="Description..."
                nameValue={editName}
                descValue={editDesc}
                onNameChange={setEditName}
                onDescChange={setEditDesc}
                onConfirm={confirmEdit}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="project-item-top">
                  <div>
                    <div className="project-name">{project.name}</div>
                    <div className="project-desc">{project.description}</div>
                  </div>
                  {isAdmin && (
                    <div
                      className="project-item-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="icon-btn edit" onClick={() => startEdit(project)}>✎</button>
                      <button className="icon-btn delete" onClick={() => onDelete && onDelete(project.id)}>✕</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </li>
        ))}

        {/* Fix #3: See More / Collapse */}
        {hasMore && (
          <li>
            <button
              className="sidebar-see-more-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "▲ COLLAPSE"
                : `▼ SEE MORE (${projects.length - PROJECT_VISIBLE_LIMIT} more)`}
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
}

// ── InlineForm ─────────────────────────────────────────────
interface InlineFormProps {
  namePlaceholder: string;
  descPlaceholder: string;
  nameValue: string;
  descValue: string;
  onNameChange: (v: string) => void;
  onDescChange: (v: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

function InlineForm({
  namePlaceholder, descPlaceholder,
  nameValue, descValue,
  onNameChange, onDescChange,
  onConfirm, onCancel,
}: InlineFormProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input
        autoFocus
        type="text"
        placeholder={namePlaceholder}
        value={nameValue}
        onChange={(e) => onNameChange(e.target.value)}
        style={inputStyle}
        onClick={(e) => e.stopPropagation()}
      />
      <input
        type="text"
        placeholder={descPlaceholder}
        value={descValue}
        onChange={(e) => onDescChange(e.target.value)}
        style={inputStyle}
        onClick={(e) => e.stopPropagation()}
      />
      <div style={{ display: "flex", gap: "6px" }}>
        <button onClick={(e) => { e.stopPropagation(); onConfirm(); }} style={confirmBtnStyle}>
          ✓ Save
        </button>
        <button onClick={(e) => { e.stopPropagation(); onCancel(); }} style={cancelBtnStyle}>
          ✕
        </button>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg-deep)",
  border: "1px solid var(--border-bright)",
  borderRadius: "6px",
  padding: "8px 12px",
  color: "var(--text-primary)",
  fontSize: "15px",
  fontFamily: "var(--font-body)",
  width: "100%",
  outline: "none",
};

const confirmBtnStyle: React.CSSProperties = {
  flex: 1,
  background: "rgba(0,245,255,0.1)",
  border: "1px solid var(--neon-cyan)",
  borderRadius: "6px",
  color: "var(--neon-cyan)",
  fontSize: "13px",
  padding: "7px",
  cursor: "pointer",
  fontFamily: "var(--font-mono)",
};

const cancelBtnStyle: React.CSSProperties = {
  background: "rgba(255,0,110,0.1)",
  border: "1px solid var(--neon-pink)",
  borderRadius: "6px",
  color: "var(--neon-pink)",
  fontSize: "13px",
  padding: "7px 12px",
  cursor: "pointer",
};
