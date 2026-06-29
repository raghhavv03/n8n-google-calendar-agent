"use client";

import { useCallback, useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot(): "light" | "dark" {
  // Always "light" on the server so hydration matches the initial HTML
  return "light";
}

function notifyThemeChange() {
  listeners.forEach((listener) => listener());
}

export function setTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  notifyThemeChange();
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  return { theme, toggleTheme };
}
