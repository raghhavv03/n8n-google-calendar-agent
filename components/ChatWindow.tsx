"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sendMessage } from "@/lib/api";
import { useTheme } from "@/lib/theme";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";
import Header from "./Header";
import TypingIndicator from "./TypingIndicator";

function createMessage(
  role: ChatMessageType["role"],
  content: string
): ChatMessageType {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date(),
  };
}

export default function ChatWindow() {
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMessage = createMessage("user", trimmed);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const reply = await sendMessage(trimmed);
      const assistantMessage = createMessage("assistant", reply);
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setError("Something went wrong.\n\nPlease try again.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleClear = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex h-dvh flex-col bg-gradient-to-b from-zinc-50 via-white to-violet-50/30 dark:from-zinc-950 dark:via-zinc-950 dark:to-indigo-950/20">
      <Header
        onClear={handleClear}
        hasMessages={messages.length > 0}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Scrollable chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          {messages.length === 0 && !error ? (
            <EmptyState onChipClick={handleSend} disabled={isLoading} />
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {isLoading && <TypingIndicator />}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                  <p className="whitespace-pre-line">{error}</p>
                </div>
              )}
            </div>
          )}

          <div ref={bottomRef} className="h-1" />
        </div>
      </div>

      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
