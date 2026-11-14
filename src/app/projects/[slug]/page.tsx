import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";
import { siteConfig } from "@/data/site";
import "@/tmux/glow.css";

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

  const { links } = project;

  return (
    <article className="glow">
      <h1>{project.title}</h1>
      <blockquote>{project.tagline}</blockquote>
      <ul>
        <li>
          <strong>date:</strong> {project.date}
        </li>
        <li>
          <strong>role:</strong> {project.role}
        </li>
        <li>
          <strong>stack:</strong>{" "}
          {project.stack.map((t, i) => (
            <span key={t}>
              {i > 0 && ", "}
              <code>{t}</code>
            </span>
          ))}
        </li>
        {links?.github && (
          <li>
            <strong>github:</strong> <a href={links.github}>{links.github}</a>
          </li>
        )}
        {links?.demo && (
          <li>
            <strong>demo:</strong> <a href={links.demo}>{links.demo}</a>
          </li>
        )}
        {links?.article && (
          <li>
            <strong>article:</strong> <a href={links.article}>{links.article}</a>
          </li>
        )}
      </ul>
      <hr />
      <MDXRemote source={project.content} />
      <hr />
      <p>
        <Link href="/projects">../projects</Link>
      </p>
    </article>
  );
}
