import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";
import { createSession, listSessions } from "../api/client";

export default function Chat() {
  const [sessions, setSessions] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    listSessions().then((s) => {
      setSessions(s);
      if (s.length) setActiveId(s[0].thread_id);
    });
  }, []);

  const handleNewSession = async () => {
    const s = await createSession();
    setSessions((prev) => [s, ...prev]);
    setActiveId(s.thread_id);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        sessions={sessions}
        onNewSession={handleNewSession}
        onSelect={setActiveId}
        activeId={activeId}
      />
      <main className="flex-1 flex flex-col">
        <header className="border-b border-border px-4 py-3">
          <h1 className="text-lg font-semibold">🚀 Study Buddy Agent</h1>
        </header>
        {activeId ? (
          <ChatWindow threadId={activeId} />
        ) : (
          <p className="m-auto text-muted-foreground text-sm">
            Start a new chat to begin.
          </p>
        )}
      </main>
    </div>
  );
}
