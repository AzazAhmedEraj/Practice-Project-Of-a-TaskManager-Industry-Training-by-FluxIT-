// Header.tsx
// Shows brand + system status on ALL pages.
// "ERAJ [ADMIN]" badge only shown when explicitly passed via prop.
// This gives each page control over whether to show it.

import "./Header.css";

interface Props {
  showAdminBadge?: boolean; // only true when on admin dashboard
  adminUsername?: string;
}

export default function Header({ showAdminBadge = false, adminUsername = "eraj" }: Props) {
  return (
    <header className="header">
      <a className="header-brand" href="/">
        <div className="header-logo-icon">E</div>
        <div className="header-brand-text">
          <div className="header-title">
            <span>Eraj</span>'s Dashboard
          </div>
          <div className="header-subtitle">Project Tracking System</div>
        </div>
      </a>

      <div className="header-right">
        <div className="header-status">
          <div className="header-status-dot" />
          SYSTEM ONLINE
        </div>

        {/* Only shown on admin dashboard, not landing/login/viewer */}
        {showAdminBadge && (
          <div className="header-user-badge">
            ◈ {adminUsername.toUpperCase()} [ADMIN]
          </div>
        )}
      </div>
    </header>
  );
}
