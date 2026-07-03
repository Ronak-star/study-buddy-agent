import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api/v1",
  headers: { "Content-Type": "application/json" },
});

export async function sendMessage(threadId, message) {
  const { data } = await apiClient.post("/chat", { thread_id: threadId, message });
  return data.reply;
}

export async function createSession() {
  const { data } = await apiClient.post("/sessions");
  return data;
}

export async function listSessions() {
  const { data } = await apiClient.get("/sessions");
  return data;
}
