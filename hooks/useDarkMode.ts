"use client";

import { useEffect, useSyncExternalStore } from "react";

// Subscribe to dark mode changes
function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  
  // Listen for storage changes from other tabs
  window.addEventListener("storage", callback);
  
  return () => {
    mediaQuery.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
  };
}

// Get the current dark mode state
function getSnapshot() {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode !== null) {
    return savedMode === "true";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Server snapshot (always false to avoid hydration mismatch)
function getServerSnapshot() {
  return false;
}

export function useDarkMode() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sync the dark class with the HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const setDarkMode = (value: boolean) => {
    localStorage.setItem("darkMode", String(value));
    
    if (value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Trigger a storage event to update other components
    window.dispatchEvent(new Event("storage"));
  };

  return { isDark, setDarkMode };
}

