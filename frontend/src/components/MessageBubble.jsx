import clsx from "clsx";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={clsx("flex w-full mb-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[75%] rounded-lg px-4 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground border border-border"
        )}
      >
        {content}
      </div>
    </div>
  );
}
