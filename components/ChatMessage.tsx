"use client";

import { motion } from "framer-motion";
import { Bot, Check, Copy, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access may be denied
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
            : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
        }`}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] ${
          isUser ? "items-end" : "items-start"
        } flex flex-col`}
      >
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? "rounded-tr-md bg-gradient-to-br from-violet-500 to-indigo-600 text-white"
              : "rounded-tl-md border border-zinc-200/80 bg-white text-zinc-800 dark:border-zinc-700/80 dark:bg-zinc-900 dark:text-zinc-100"
          }`}
        >
          <div
            className={`prose prose-sm max-w-none break-words ${
              isUser
                ? "prose-invert prose-p:text-white prose-a:text-violet-100 prose-strong:text-white prose-li:text-white"
                : "dark:prose-invert prose-p:text-zinc-800 prose-a:text-violet-600 dark:prose-p:text-zinc-100 dark:prose-a:text-violet-400"
            } prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Timestamp & copy */}
        <div
          className={`mt-1.5 flex items-center gap-2 px-1 ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {formatTimestamp(message.timestamp)}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy message"
            className="rounded-md p-1 text-zinc-400 opacity-100 transition-all hover:bg-zinc-100 hover:text-zinc-600 sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
