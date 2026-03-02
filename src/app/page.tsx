import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import { getFeaturedRepos } from "@/lib/github";
import { technologies } from "@/data/technologies";
import { siteConfig } from "@/data/site";
import { ProjectCard } from "@/components/ProjectCard";
import { RepoCard } from "@/components/RepoCard";
import { SectionHeading } from "@/components/SectionHeading";

export default async function HomePage() {
  const [projects, repos] = await Promise.all([
    Promise.resolve(getAllProjects()),
    getFeaturedRepos(),
  ]);

  const featuredProjects = projects.slice(0, 3);

  const topCategories = ["Languages", "Data & AI", "Frontend"];
  const featuredTech = technologies.filter((t) =>
    topCategories.includes(t.category)
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="mb-16">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-3">
          Software Engineer
        </p>
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4"
        >
          Building systems that
          <br />
          <span className="text-indigo-400">are worth understanding.</span>
        </h1>
        <p className="text-base text-gray-400 max-w-xl leading-relaxed mb-6">
          I write clean, reliable software. Here you&apos;ll find case studies
          from projects I&apos;ve built, technologies I use, and code I&apos;ve
          shipped.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            View Projects
          </Link>
          <a
            href={siteConfig.links.email}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section aria-labelledby="projects-heading" className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <SectionHeading eyebrow="Work" title="Featured Projects" />
            <Link
              href="/projects"
              className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Repos */}
      {repos.length > 0 && (
        <section aria-labelledby="repos-heading" className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <SectionHeading eyebrow="Open Source" title="Featured Repos" />
            <Link
              href="/repos"
              className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
            >
              All repos →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {repos.slice(0, 4).map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {/* Tech Snapshot */}
      <section aria-labelledby="tech-heading" className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <SectionHeading eyebrow="Tools" title="Tech Snapshot" />
          <Link
            href="/technologies"
            className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
          >
            Full stack →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {featuredTech.map((tech) => (
            <span
              key={tech.name}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-gray-300"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        aria-labelledby="cta-heading"
        className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-7 text-center"
      >
        <h2
          id="cta-heading"
          className="text-2xl font-bold text-white mb-3"
        >
          Let&apos;s build something together
        </h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Open to interesting problems, collaborations, and conversations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={siteConfig.links.email}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            Send an email
          </a>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 transition-colors"
          >
            LinkedIn ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
