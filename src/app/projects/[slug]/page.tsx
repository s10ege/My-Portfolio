import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";
import { Prose } from "@/components/Prose";
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
    <div className="mx-auto max-w-3xl px-6 pt-12 pb-24 sm:pt-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="group inline-flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span>
        cd ../projects
      </Link>

      {/* Header */}
      <header className="mt-10 mb-12 border-b border-rule pb-12">
        <p className="mb-4 font-mono text-[0.72rem] text-fg-muted">
          <span className="text-fg-dim">projects/</span>
          <span className="text-fg">{project.slug}</span>
          <span className="text-fg-dim">.mdx</span>
          <span className="ml-2 text-fg-dim">·</span>
          <span className="ml-2 text-accent">{project.date}</span>
          <span className="ml-2 text-fg-dim">·</span>
          <span className="ml-2 text-fg-muted">{project.role}</span>
        </p>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">
          {project.tagline}
        </p>

        {/* Stack as inline-code chips */}
        <div className="mt-7 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="chip-code">
              {tech}
            </span>
          ))}
        </div>

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <div className="mt-8 rounded-lg border border-rule bg-surface-1/50 p-5">
            <p className="mb-3 font-mono text-[0.72rem] text-accent">
              <span className="text-accent/60">{"// "}</span>highlights
            </p>
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-fg"
                >
                  <span aria-hidden className="mt-0.5 font-mono text-accent">
                    ›
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        {(project.links?.github || project.links?.demo || project.links?.article) && (
          <div className="mt-7 flex flex-wrap gap-2">
            {project.links?.demo && (
              <Link
                href={project.links?.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
              >
                Live demo
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
              </Link>
            )}
            {project.links?.github && (
              <Link
                href={project.links?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-rule px-4 py-2 font-mono text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
              >
                <span aria-hidden className="text-fg-dim group-hover:text-accent">↗</span>
                github
              </Link>
            )}
            {project.links?.article && (
              <Link
                href={project.links?.article}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-rule px-4 py-2 font-mono text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
              >
                <span aria-hidden className="text-fg-dim group-hover:text-accent">↗</span>
                article
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
