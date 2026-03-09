// AuthContext.tsx
// Global authentication state.
// Session is NOT persisted across page refreshes — 
// user must always log in fresh each visit.
// This is the cleanest behavior for a demo/assignment app.
// (To re-enable persistence, swap the useState initializer back to localStorage.)

import { createContext, useContext, useState, ReactNode } from "react";
import { AuthUser } from "../types";

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

// Credentials — change here to update login
const VALID_USERNAME = "eraj";
const VALID_PASSWORD = "1234";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with null — always requires fresh login each visit
  // No localStorage read here — intentional, ensures login gate works
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(username: string, password: string): boolean {
    if (
      username.toLowerCase() === VALID_USERNAME &&
      password === VALID_PASSWORD
    ) {
      setUser({ username: VALID_USERNAME, role: "admin" });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
