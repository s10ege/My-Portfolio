interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div>
      {eyebrow && (
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {description && (
        <p className="mt-2 text-gray-400 max-w-xl">{description}</p>
      )}
    </div>
  );
}
