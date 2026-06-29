"use client";

import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";

const EXAMPLE_CHIPS = [
  "Schedule a meeting tomorrow",
  "Show today's events",
  "Create Gym at 7 PM",
  "What's on my calendar?",
];

interface EmptyStateProps {
  onChipClick: (message: string) => void;
  disabled?: boolean;
}

export default function EmptyState({ onChipClick, disabled }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center px-4 py-8 text-center sm:py-12"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
        <Sparkles className="h-7 w-7 text-white" />
      </div>

      <div className="max-w-md space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          Hi Raghav 👋
        </h2>
        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          I&apos;m your AI Personal Assistant.
          <br />
          You can ask me to manage your Google Calendar, schedule meetings,
          check your events, and much more.
        </p>
      </div>

      <div className="mt-8 flex w-full max-w-lg flex-wrap justify-center gap-2">
        {EXAMPLE_CHIPS.map((chip, index) => (
          <motion.button
            key={chip}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
            disabled={disabled}
            onClick={() => onChipClick(chip)}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-violet-600 dark:hover:bg-violet-950/50 dark:hover:text-violet-300"
          >
            <Calendar className="h-3.5 w-3.5 shrink-0 opacity-60" />
            {chip}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
