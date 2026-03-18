// LandingPage.tsx
// Theme toggle button sits in top-right of landing content area.

import { useTheme } from "../context/ThemeContext";
import "./LandingPage.css";

interface Props {
  onViewProjects: () => void;
  onEnterAdmin: () => void;
}

export default function LandingPage({ onViewProjects, onEnterAdmin }: Props) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <main className="landing">
      <div className="landing-grid" />
      <div className="landing-orb landing-orb-1" />
      <div className="landing-orb landing-orb-2" />

      {/* Theme toggle — top right corner of landing */}
      <button className="theme-toggle-btn" onClick={toggleTheme} title="Switch theme">
        {isDark ? (
          <>
            <span className="theme-toggle-icon">☀</span>
            Switch to Classic Mode
          </>
        ) : (
          <>
            <span className="theme-toggle-icon">◑</span>
            Switch to Dark Mode
          </>
        )}
      </button>

      <div className="landing-content">
        <div className="landing-tag">◈ Project Management System v1.0</div>

        <h1 className="landing-title">
          <span className="accent">Eraj</span>'s
          <br />
          <span className="accent-pink">Dashboard</span>
        </h1>

        <p className="landing-description">
          A professional cyberpunk-themed project management tool.
          Track tasks, manage projects, and stay in control — all in one place.
        </p>

        <div className="landing-features">
          <div className="landing-feature">
            <span className="feature-icon">⬡</span>
            <span className="feature-label">Task Board</span>
          </div>
          <div className="landing-feature">
            <span className="feature-icon">◈</span>
            <span className="feature-label">Projects</span>
          </div>
          <div className="landing-feature">
            <span className="feature-icon">⟁</span>
            <span className="feature-label">Analytics</span>
          </div>
          <div className="landing-feature">
            <span className="feature-icon">⚿</span>
            <span className="feature-label">Secure</span>
          </div>
        </div>

        <div className="landing-buttons">
          <button className="btn-primary" onClick={onViewProjects}>
            ▶ View Projects
          </button>
          <button className="btn-secondary" onClick={onEnterAdmin}>
            ◈ Eraj's Area
          </button>
        </div>
      </div>
    </main>
  );
}
