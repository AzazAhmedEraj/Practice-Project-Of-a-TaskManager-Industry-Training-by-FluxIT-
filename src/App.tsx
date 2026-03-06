// App.tsx — Root Component & Navigation Controller
//
// Fix #5: Header only shows admin badge on admin pages
// Fix #6: "Eraj's Area" always goes to login — session is checked THERE,
//         not here. This means clicking the button never skips login.
//         After successful login, session persists via localStorage.
//         Logout clears session and returns to landing.

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

  function goLanding()      { setPage("landing"); }
  function goLogin()        { setPage("login"); }
  function goViewer()       { setPage("viewer"); }
  function goAdmin()        { setPage("admin"); }
  function goAdminPreview() { setPage("admin-preview"); }

  function handleLoginSuccess() { setPage("admin"); }

  function handleLogout() {
    logout();
    setPage("landing");
  }

  // Fix #6: "Eraj's Area" ALWAYS goes to login page first.
  // LoginPage itself handles the case where user is already logged in
  // and can skip straight through — but the button always routes to login.
  function handleEnterAdmin() {
    setPage("login");
  }

  // Fix #5: only show admin badge on admin pages
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
            // Fix #6: if already logged in, auto-proceed to admin
            alreadyAuthenticated={!!user}
            onAlreadyAuthenticated={goAdmin}
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
      {/* Fix #5: pass showAdminBadge so badge only appears on admin pages */}
      <Header
        showAdminBadge={showAdminBadge}
        adminUsername={user?.username}
      />
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
