import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import { getFeaturedRepos } from "@/lib/github";
import { technologies } from "@/data/technologies";
import { siteConfig } from "@/data/site";
import { ProjectCard } from "@/components/ProjectCard";
import { RepoCard } from "@/components/RepoCard";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/FadeIn";
import { StaggerFadeIn, StaggerFadeInItem } from "@/components/StaggerFadeIn";

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
        <FadeIn delay={0.05} direction="up">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400">
              Software Engineer
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs text-green-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to work
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.15} direction="up">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4"
          >
            Building systems that
            <br />
            <span className="text-indigo-400">are worth understanding.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.25} direction="up">
          <p className="text-base text-gray-400 max-w-xl leading-relaxed mb-6">
            Final year Computer Systems Engineering student at Brunel. I work
            across the stack — from microcontrollers to machine learning. This
            is where I keep my projects and experiments.
          </p>
        </FadeIn>
        <FadeIn delay={0.35} direction="up">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <FadeIn direction="up" className="mb-14">
          <section aria-labelledby="projects-heading">
            <div className="flex items-center justify-between mb-5">
              <SectionHeading eyebrow="Work" title="Featured Projects" />
              <Link
                href="/projects"
                className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
              >
                All projects →
              </Link>
            </div>
            <StaggerFadeIn className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <StaggerFadeInItem key={project.slug}>
                  <ProjectCard project={project} />
                </StaggerFadeInItem>
              ))}
            </StaggerFadeIn>
          </section>
        </FadeIn>
      )}

      {/* Featured Repos */}
      {repos.length > 0 && (
        <FadeIn direction="up" className="mb-14">
          <section aria-labelledby="repos-heading">
            <div className="flex items-center justify-between mb-5">
              <SectionHeading eyebrow="Open Source" title="Featured Repos" />
              <Link
                href="/repos"
                className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
              >
                All repos →
              </Link>
            </div>
            <StaggerFadeIn className="grid gap-4 sm:grid-cols-2">
              {repos.slice(0, 4).map((repo) => (
                <StaggerFadeInItem key={repo.name}>
                  <RepoCard repo={repo} />
                </StaggerFadeInItem>
              ))}
            </StaggerFadeIn>
          </section>
        </FadeIn>
      )}

      {/* Tech Snapshot */}
      <FadeIn direction="up" className="mb-14">
        <section aria-labelledby="tech-heading">
          <div className="flex items-center justify-between mb-5">
            <SectionHeading eyebrow="Tools" title="Tech Snapshot" />
            <Link
              href="/technologies"
              className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
            >
              Full stack →
            </Link>
          </div>
          <StaggerFadeIn className="flex flex-wrap gap-2">
            {featuredTech.map((tech) => (
              <StaggerFadeInItem key={tech.name}>
                <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-gray-300">
                  {tech.name}
                </span>
              </StaggerFadeInItem>
            ))}
          </StaggerFadeIn>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn direction="up">
        <section
          aria-labelledby="cta-heading"
          className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-7 text-center"
        >
          <h2
            id="cta-heading"
            className="text-2xl font-bold text-white mb-3"
          >
            Available for opportunities in London
          </h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Graduating soon and actively looking for graduate roles in
            machine learning, software development, and related fields —
            based in London. If you&apos;re hiring or just want to talk,
            I&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              Send an email
            </Link>
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
      </FadeIn>
    </div>
  );
}
