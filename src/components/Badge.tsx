interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "language";
}

const languageAccents: Record<string, string> = {
  TypeScript: "before:bg-blue-400",
  JavaScript: "before:bg-yellow-400",
  Python: "before:bg-emerald-400",
  Go: "before:bg-cyan-400",
  Rust: "before:bg-orange-400",
  "C++": "before:bg-pink-400",
  Shell: "before:bg-zinc-400",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  if (variant === "language") {
    const lang = typeof children === "string" ? children : "";
    const dot = languageAccents[lang] ?? "before:bg-fg-muted";
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-fg-muted before:inline-block before:h-2 before:w-2 before:rounded-full before:content-[''] ${dot}`}
      >
        {children}
      </span>
    );
  }

  return <span className="chip-code">{children}</span>;
}
