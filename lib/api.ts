import type { WebhookRequest } from "@/types/chat";

// Change this URL to point to your n8n webhook
const WEBHOOK_URL =
  "https://raghhav03.app.n8n.cloud/webhook-test/888c848f-d996-4f87-9919-6bb9d649936b";

const USER_ID = "raghav-demo";

const REPLY_KEYS = ["response", "message", "output", "text", "reply"] as const;

/**
 * Extracts the assistant reply from various n8n response formats:
 * - Plain text (n8n "Respond With: Text")
 * - JSON object: { response | message | output }
 * - JSON array: [{ output: "..." }]
 */
export function parseWebhookResponse(raw: unknown): string {
  if (raw === null || raw === undefined) return "";

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return "";

    // n8n may return JSON as a string — try parsing it
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return parseWebhookResponse(JSON.parse(trimmed));
      } catch {
        // Not JSON — use the raw text (n8n plain-text mode)
        return trimmed;
      }
    }

    return trimmed;
  }

  if (Array.isArray(raw)) {
    if (raw.length === 0) return "";
    return parseWebhookResponse(raw[0]);
  }

  if (typeof raw === "object") {
    const record = raw as Record<string, unknown>;

    for (const key of REPLY_KEYS) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
  }

  return "";
}

/**
 * Sends a user message to the n8n AI Agent webhook.
 */
export async function sendMessage(message: string): Promise<string> {
  const payload: WebhookRequest = {
    message,
    userId: USER_ID,
  };

  const response = await fetch(WEBHOOK_URL.trim(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed with status ${response.status}`);
  }

  // Read as text first — n8n "Respond With: Text" returns plain text, not JSON
  const rawText = await response.text();
  const reply = parseWebhookResponse(rawText);

  if (!reply) {
    throw new Error("Empty response from webhook");
  }

  return reply;
}
