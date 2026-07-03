import { useCallback, useState } from "react";
import { sendMessage } from "../api/client";

export function useChat(threadId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(
    async (text) => {
      if (!text.trim()) return;
      setMessages((prev) => [...prev, { role: "user", content: text }]);
      setLoading(true);
      try {
        const reply = await sendMessage(threadId, text);
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [threadId]
  );

  return { messages, loading, send };
}
