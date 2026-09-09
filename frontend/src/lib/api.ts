const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api";

export interface Settings {
  provider: string;
  api_key?: string;
  base_url?: string;
  model: string;
  temperature: number;
  simulation_mode: string;
}

export interface Message {
  id: number;
  ticket_id: string;
  sender: "AGENT" | "USER";
  content: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  difficulty: string;
  user_profile: string;
  status: string;
  score?: number;
  feedback?: string; // JSON string
  created_at: string;
}

export interface TicketDetail extends Ticket {
  context: string;
  expected_solution: string;
  keywords: string;
  messages: Message[];
}

export interface EvaluationResult {
  score: number;
  strengths: string[];
  improvements: string[];
  diagnosis_probable: string;
  expected_solution: string;
  feedback_text: string;
}

export interface DashboardStats {
  total_tickets: number;
  open_tickets: number;
  completed_tickets: number;
  avg_score: number;
  recent_tickets: Ticket[];
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `API error ${response.status}`);
  }

  return response.json();
}

export const api = {
  getStats: () => request<DashboardStats>("/stats"),
  getTickets: () => request<Ticket[]>("/tickets"),
  getTicket: (id: string) => request<TicketDetail>(`/tickets/${id}`),
  generateTicket: (payload: {
    category?: string;
    priority?: string;
    difficulty?: string;
    user_profile?: string;
  }) =>
    request<Ticket>("/tickets/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  sendChatMessage: (id: string, content: string) =>
    request<Message[]>(`/tickets/${id}/chat`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
  resolveTicket: (id: string, diagnosis: string) =>
    request<EvaluationResult>(`/tickets/${id}/resolve`, {
      method: "POST",
      body: JSON.stringify({ diagnosis }),
    }),
  restartTicket: (id: string) =>
    request<TicketDetail>(`/tickets/${id}/restart`, {
      method: "POST",
    }),
  getSettings: () => request<Settings>("/settings"),
  updateSettings: (payload: Omit<Settings, "id">) =>
    request<Settings>("/settings", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  resetDatabase: () =>
    request<{ message: string }>("/settings/reset", {
      method: "POST",
    }),
};
