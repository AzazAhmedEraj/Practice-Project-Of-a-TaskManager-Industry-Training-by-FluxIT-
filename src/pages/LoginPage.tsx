// LoginPage.tsx — No credentials displayed, clean professional login form.

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Props {
  onSuccess: () => void;
  onBack: () => void;
}

export default function LoginPage({ onSuccess, onBack }: Props) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = login(username.trim(), password);
      setLoading(false);
      if (success) {
        onSuccess();
      } else {
        setError("Invalid credentials. Access denied.");
        setPassword("");
      }
    }, 500);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <main className="login-page">
      <div className="landing-grid" />

      <div className="login-card">
        <div className="login-card-header">
          <div className="login-icon">E</div>
          <div className="login-title">ERAJ'S AREA</div>
          <div className="login-subtitle">Admin Access Required</div>
        </div>

        <div className="login-form">
          {error && <div className="login-error">⚠ {error}</div>}

          <div className="form-field">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
          </div>

          <button
            className="login-submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "AUTHENTICATING..." : "▶ ACCESS SYSTEM"}
          </button>

          <button className="login-back-btn" onClick={onBack}>
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
