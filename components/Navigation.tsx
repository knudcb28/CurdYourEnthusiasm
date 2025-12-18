"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Switch from "./Switch";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function Navigation() {
  const pathname = usePathname();
  const { isDark, setDarkMode } = useDarkMode();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="text-2xl">🧀</span>
            <span className="hidden text-lg font-bold text-zinc-900 dark:text-zinc-50 sm:inline">
              Curd Your Enthusiasm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-curd-600 dark:text-curd-400"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }`}
            >
              Reviews
            </Link>
            <Link
              href="/top-100"
              className={`text-sm font-medium transition-colors ${
                isActive("/top-100")
                  ? "text-curd-600 dark:text-curd-400"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }`}
            >
              Top 100
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-curd-600 dark:text-curd-400"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }`}
            >
              About
            </Link>

            {/* Dark Mode Toggle with icons inside the switch */}
            <Switch
              checked={isDark}
              onChange={setDarkMode}
              ariaLabel="Toggle dark mode"
              icons={{
                checked: "🌙",
                unchecked: "☀️",
              }}
            />
          </div>

          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 md:hidden"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
