"use client";

import { Moon, Sun, Trash2 } from "lucide-react";

interface HeaderProps {
  onClear: () => void;
  hasMessages: boolean;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Header({
  onClear,
  hasMessages,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-xl">
            AI Personal Assistant
          </h1>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            Powered by n8n AI Agent
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="rounded-xl p-2.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          {hasMessages && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear conversation"
              className="rounded-xl p-2.5 text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
