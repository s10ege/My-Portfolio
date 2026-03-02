import type { Metadata } from "next";
import { technologies, type TechCategory } from "@/data/technologies";
import { TechGroup } from "@/components/TechGroup";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Technologies",
  description: `The tools and technologies ${siteConfig.githubUsername} works with.`,
};

const CATEGORY_ORDER: TechCategory[] = [
  "Languages",
  "Data & AI",
  "Frontend",
  "Systems",
  "Platforms & Tools",
  "Tooling",
  "Spoken Languages",
];

export default function TechnologiesPage() {
  const grouped = CATEGORY_ORDER.reduce<Record<TechCategory, typeof technologies>>(
    (acc, cat) => {
      acc[cat] = technologies.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<TechCategory, typeof technologies>
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-14">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-3">
          Stack
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">Technologies</h1>
        <p className="text-gray-400 max-w-lg">
          The languages, frameworks, tools, and platforms I use day-to-day and
          professionally.
        </p>
      </header>

      <div className="space-y-14">
        {CATEGORY_ORDER.map((category) => {
          const items = grouped[category];
          if (!items || items.length === 0) return null;
          return (
            <TechGroup key={category} category={category} items={items} />
          );
        })}
      </div>
    </div>
  );
}
