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
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24">
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="mb-24 sm:mb-28">
        <FadeIn delay={0.05} direction="up">
          <p className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.78rem] text-fg-muted">
            <span className="text-accent">$</span>
            <span>{siteConfig.name}</span>
            <span className="text-fg-dim">·</span>
            <span>software engineer</span>
            <span className="text-fg-dim">·</span>
            <span>london</span>
            <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-[0.7rem] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              open to work
            </span>
          </p>
        </FadeIn>

        <FadeIn delay={0.15} direction="up">
          <h1
            id="hero-heading"
            className="text-5xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-[4.25rem]"
          >
            Building systems
            <br />
            that are{" "}
            <span className="font-display font-normal italic text-accent">
              worth understanding.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.25} direction="up">
          <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            Final-year Computer Systems Engineering student at Brunel. I work
            across the stack — from microcontrollers to machine learning. This
            is where I keep my projects and experiments.
          </p>
        </FadeIn>

        <FadeIn delay={0.35} direction="up">
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
            >
              View projects
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-mono text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <span aria-hidden className="text-fg-dim group-hover:text-accent">↗</span>
              get in touch
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <FadeIn direction="up" className="mb-20">
          <section aria-labelledby="projects-heading">
            <div className="mb-7 flex items-end justify-between gap-4">
              <SectionHeading eyebrow="featured projects" title="Work that ships." />
              <Link
                href="/projects"
                className="shrink-0 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
              >
                all projects →
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
        <FadeIn direction="up" className="mb-20">
          <section aria-labelledby="repos-heading">
            <div className="mb-7 flex items-end justify-between gap-4">
              <SectionHeading eyebrow="open source" title="Things I've shipped." />
              <Link
                href="/repos"
                className="shrink-0 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
              >
                all repos →
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
      <FadeIn direction="up" className="mb-20">
        <section aria-labelledby="tech-heading">
          <div className="mb-7 flex items-end justify-between gap-4">
            <SectionHeading eyebrow="stack" title="Tools of the trade." />
            <Link
              href="/technologies"
              className="shrink-0 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
            >
              full stack →
            </Link>
          </div>
          <StaggerFadeIn className="flex flex-wrap gap-1.5">
            {featuredTech.map((tech) => (
              <StaggerFadeInItem key={tech.name}>
                <span className="chip-code">{tech.name}</span>
              </StaggerFadeInItem>
            ))}
          </StaggerFadeIn>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn direction="up">
        <section
          aria-labelledby="cta-heading"
          className="relative overflow-hidden rounded-lg border border-rule bg-surface-1/50 p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          />
          <p className="mb-3 font-mono text-xs text-accent">
            <span className="text-accent/60">{"//"}</span> currently
          </p>
          <h2
            id="cta-heading"
            className="mb-4 text-2xl font-semibold tracking-tight text-fg sm:text-[1.75rem]"
          >
            Available for graduate roles in{" "}
            <span className="font-display font-normal italic text-accent">London</span>.
          </h2>
          <p className="mb-7 max-w-xl text-fg-muted leading-relaxed">
            Graduating soon and actively looking for graduate positions in
            machine learning, software development, and related fields. If
            you&apos;re hiring or just want to talk, my inbox is open.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
            >
              Send a message
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-mono text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <span aria-hidden className="text-fg-dim group-hover:text-accent">↗</span>
              linkedin
            </Link>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
