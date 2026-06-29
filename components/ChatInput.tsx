"use client";

import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = () => {
    const textarea = textareaRef.current;
    if (!textarea || disabled) return;

    const value = textarea.value.trim();
    if (!value) return;

    onSend(value);
    textarea.value = "";
    textarea.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-zinc-200/80 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80 sm:p-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-zinc-950/50">
          <textarea
            ref={textareaRef}
            rows={1}
            disabled={disabled}
            placeholder="Ask about your calendar..."
            onChange={adjustHeight}
            onKeyDown={handleKeyDown}
            className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100 dark:placeholder:text-zinc-500 sm:text-base"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={disabled}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/25 transition-all hover:from-violet-600 hover:to-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
