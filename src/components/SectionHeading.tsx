interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs lowercase tracking-wide text-fg-dim">
          <span className="text-accent/70">{"// "}</span>
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-fg-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
