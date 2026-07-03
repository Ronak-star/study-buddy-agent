import { Plus } from "lucide-react";

export default function Sidebar({ sessions = [], onNewSession, onSelect, activeId }) {
  return (
    <aside className="w-64 border-r border-border h-full flex flex-col bg-muted/40">
      <div className="p-3 border-b border-border">
        <button
          onClick={onNewSession}
          className="w-full flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm px-3 py-2 hover:opacity-90"
        >
          <Plus size={16} /> New chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sessions.map((s) => (
          <button
            key={s.thread_id}
            onClick={() => onSelect(s.thread_id)}
            className={`w-full text-left text-sm rounded-md px-3 py-2 truncate hover:bg-muted ${
              activeId === s.thread_id ? "bg-muted font-medium" : ""
            }`}
          >
            {s.title || "New chat"}
          </button>
        ))}
      </div>
    </aside>
  );
}
