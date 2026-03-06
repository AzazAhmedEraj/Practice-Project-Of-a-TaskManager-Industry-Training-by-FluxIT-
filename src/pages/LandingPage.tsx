// ============================================================
// PAGES/LandingPage.tsx
//
// The first page users see.
// Two buttons:
//   1. "View Projects" → read-only dashboard
//   2. "Eraj's Area"   → login form → admin dashboard
// ============================================================

import "./LandingPage.css";

interface Props {
  onViewProjects: () => void;
  onEnterAdmin: () => void;
}

const FEATURES = [
  { icon: "◈", label: "Projects" },
  { icon: "⬡", label: "Task Board" },
  { icon: "⌕", label: "Filters" },
  { icon: "▣", label: "Statistics" },
  { icon: "⟳", label: "Persistent" },
];

export default function LandingPage({ onViewProjects, onEnterAdmin }: Props) {
  return (
    <main className="landing">
      {/* Background decorations */}
      <div className="landing-grid" />
      <div className="landing-orb landing-orb-1" />
      <div className="landing-orb landing-orb-2" />

      {/* Main content */}
      <div className="landing-content">
        {/* Tag line */}
        <div className="landing-tag">⬡ Frontend SaaS Architecture · React + TypeScript</div>

        {/* Hero title */}
        <h1 className="landing-title">
          <span className="accent">Eraj's</span> Project
          <br />
          Management{" "}
          <span className="accent-pink">System</span>
        </h1>

        {/* Description */}
        <p className="landing-description">
          A production-grade, frontend-only SaaS dashboard simulating
          real-world tools like <strong>Jira</strong> and <strong>ClickUp</strong>.
          Built with React, TypeScript, custom hooks, derived state, and
          LocalStorage persistence — architected like a real engineering team
          would build it.
        </p>

        {/* Feature pills */}
        <div className="landing-features">
          {FEATURES.map((f) => (
            <div key={f.label} className="landing-feature">
              <span className="feature-icon">{f.icon}</span>
              <span className="feature-label">{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="landing-buttons">
          {/* View Only mode — no login required */}
          <button className="btn-primary" onClick={onViewProjects}>
            ◈ View Projects
          </button>

          {/* Admin access — requires login */}
          <button className="btn-secondary" onClick={onEnterAdmin}>
            ⬡ Eraj's Area
          </button>
        </div>
      </div>
    </main>
  );
}
