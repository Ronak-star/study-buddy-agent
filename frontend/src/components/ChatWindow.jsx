import { Send } from "lucide-react";
import { useState } from "react";
import { useChat } from "../hooks/useChat";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ threadId }) {
  const { messages, loading, send } = useChat(threadId);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-muted-foreground text-sm text-center mt-10">
            Ask Study Buddy anything — summaries, flashcards, quick math, and more.
          </p>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <p className="text-muted-foreground text-xs">Study Buddy is thinking…</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-border">
        <input
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm flex items-center gap-1 hover:opacity-90"
        >
          <Send size={16} /> Send
        </button>
      </form>
    </div>
  );
}
