import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Hand-crafted case studies from projects built by ${siteConfig.githubUsername}.`,
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-14">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-3">
          Work
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">Projects</h1>
        <p className="text-gray-400 max-w-lg">
          Detailed case studies covering the problem, approach, architecture,
          and learnings from each project.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet. Check back soon.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
