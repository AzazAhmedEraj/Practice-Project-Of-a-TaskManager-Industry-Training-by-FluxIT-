// ThemeContext.tsx
// Provides "dark" | "classic" theme across the whole app.
// Persists to localStorage so the choice survives a refresh.
// Usage in any component: const { theme, toggleTheme } = useTheme();

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "classic";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("dashboard_theme");
    return (saved === "classic" || saved === "dark") ? saved : "dark";
  });

  // Apply theme class to <html> element — this is what CSS [data-theme] selectors key off
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dashboard_theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "classic" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
