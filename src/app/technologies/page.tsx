import type { Metadata } from "next";
import { technologies, type TechCategory } from "@/data/technologies";
import { TechGroup } from "@/components/TechGroup";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Technologies",
  description: `The tools and technologies ${siteConfig.name} works with.`,
};

const CATEGORY_ORDER: TechCategory[] = [
  "Languages",
  "AI & Machine Learning",
  "Data & Databases",
  "Web & Frameworks",
  "Software Engineering",
  "Embedded & Hardware",
  "Tools & Platforms",
  "Responsible AI",
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
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-20">
      <header className="mb-16">
        <p className="mb-4 font-mono text-xs text-accent">
          <span className="text-accent/60">{"// "}</span>stack
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Tools of the{" "}
          <span className="font-display font-normal italic text-accent">trade</span>.
        </h1>
        <p className="mt-5 max-w-xl text-fg-muted leading-relaxed">
          The languages, frameworks, tools, and platforms I use day-to-day and
          professionally.
        </p>
      </header>

      <div className="space-y-12 border-t border-rule pt-12">
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
