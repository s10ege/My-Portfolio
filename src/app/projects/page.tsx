import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Hand-crafted case studies from projects built by ${siteConfig.name}.`,
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-20">
      <header className="mb-14">
        <p className="mb-4 font-mono text-xs text-accent">
          <span className="text-accent/60">{"// "}</span>work
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Projects.
        </h1>
        <p className="mt-5 max-w-xl text-fg-muted leading-relaxed">
          Detailed case studies covering the problem, approach, architecture,
          and learnings from each project.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-fg-dim">
          {"// no projects yet — check back soon"}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
