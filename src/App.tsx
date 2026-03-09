// App.tsx
// Auth fix: "Eraj's Area" ALWAYS goes to login page.
// The login page always shows the form — no auto-skip.
// Session only resumes if user manually submits correct credentials,
// OR if they already have an active session and choose to use it.

import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./styles/globals.css";

type Page = "landing" | "login" | "viewer" | "admin" | "admin-preview";

function AppInner() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState<Page>("landing");

  const goLanding      = () => setPage("landing");
  const goViewer       = () => setPage("viewer");
  const goAdmin        = () => setPage("admin");
  const goAdminPreview = () => setPage("admin-preview");

  // Always go to login — never jump to admin directly
  const handleEnterAdmin = () => setPage("login");

  const handleLoginSuccess = () => setPage("admin");

  const handleLogout = () => {
    logout();
    setPage("landing");
  };

  // Admin badge only on admin pages
  const showAdminBadge = (page === "admin" || page === "admin-preview") && !!user;

  function renderPage() {
    switch (page) {
      case "landing":
        return (
          <LandingPage
            onViewProjects={goViewer}
            onEnterAdmin={handleEnterAdmin}
          />
        );

      case "login":
        return (
          <LoginPage
            onSuccess={handleLoginSuccess}
            onBack={goLanding}
          />
        );

      case "viewer":
        return (
          <DashboardPage
            isAdmin={false}
            onGoHome={goLanding}
          />
        );

      case "admin":
        return (
          <DashboardPage
            isAdmin={true}
            onSwitchToViewMode={goAdminPreview}
            onGoHome={goLanding}
            onLogout={handleLogout}
          />
        );

      case "admin-preview":
        return (
          <DashboardPage
            isAdmin={false}
            onBackToAdmin={goAdmin}
            onGoHome={goLanding}
          />
        );

      default:
        return <LandingPage onViewProjects={goViewer} onEnterAdmin={handleEnterAdmin} />;
    }
  }

  return (
    <div className="app-shell">
      <Header showAdminBadge={showAdminBadge} adminUsername={user?.username} />
      <div className="page-content">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
