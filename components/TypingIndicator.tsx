"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
        <Bot className="h-4 w-4" />
      </div>

      <div className="rounded-2xl rounded-tl-md border border-zinc-200/80 bg-white px-4 py-3 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-900">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
