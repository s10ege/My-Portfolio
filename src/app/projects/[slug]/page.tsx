import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";
import { Prose } from "@/components/Prose";
import { Badge } from "@/components/Badge";
import { siteConfig } from "@/data/site";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      url: `${siteConfig.url}/projects/${slug}`,
      ...(project.coverImage
        ? { images: [{ url: project.coverImage }] }
        : {}),
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-400 transition-colors mb-12"
      >
        ← All Projects
      </Link>

      {/* Header */}
      <header className="mb-12 pb-12 border-b border-white/[0.08]">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-3">
          {project.date} · {project.role}
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
        <p className="text-xl text-gray-400 mb-8">{project.tagline}</p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Highlights
            </p>
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-indigo-500 mt-0.5">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        {(project.links?.github || project.links?.demo || project.links?.article) && (
          <div className="flex flex-wrap gap-3 mt-6">
            {project.links?.github && (
              <Link
                href={project.links?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white hover:border-white/30 transition-colors"
              >
                GitHub ↗
              </Link>
            )}
            {project.links?.demo && (
              <Link
                href={project.links?.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
              >
                Live Demo ↗
              </Link>
            )}
            {project.links?.article && (
              <Link
                href={project.links?.article}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white hover:border-white/30 transition-colors"
              >
                Article ↗
              </Link>
            )}
          </div>
        )}
      </header>

      {/* MDX Body */}
      <Prose>
        <MDXRemote source={project.content} />
      </Prose>
    </div>
  );
}
