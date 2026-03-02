import type { Technology, TechCategory } from "@/data/technologies";

interface TechGroupProps {
  category: TechCategory;
  items: Technology[];
}

export function TechGroup({ category, items }: TechGroupProps) {
  return (
    <div>
      <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-4">
        {category}
      </h2>
      <ul className="flex flex-wrap gap-2" role="list">
        {items.map((tech) => (
          <li
            key={tech.name}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-gray-300"
          >
            <span>{tech.name}</span>
            {tech.notes && (
              <span className="text-xs text-gray-600">· {tech.notes}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
