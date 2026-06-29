export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface WebhookRequest {
  message: string;
  userId: string;
}

export interface WebhookResponse {
  response?: string;
  message?: string;
  output?: string;
}
