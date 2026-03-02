interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "language";
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-900/60 text-blue-300",
  JavaScript: "bg-yellow-900/60 text-yellow-300",
  Python: "bg-emerald-900/60 text-emerald-300",
  Go: "bg-cyan-900/60 text-cyan-300",
  Rust: "bg-orange-900/60 text-orange-300",
  "C++": "bg-pink-900/60 text-pink-300",
  Shell: "bg-gray-700/60 text-gray-300",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  const lang = typeof children === "string" ? children : "";
  const colorClass =
    variant === "language" && languageColors[lang]
      ? languageColors[lang]
      : "bg-white/[0.07] text-gray-300";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {children}
    </span>
  );
}
