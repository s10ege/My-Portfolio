import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedRepos } from "@/lib/github";
import { RepoCard } from "@/components/RepoCard";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Repos",
  description: `Curated open-source repositories by ${siteConfig.name}.`,
};

export default async function ReposPage() {
  const repos = await getFeaturedRepos();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-20">
      <header className="mb-14">
        <p className="mb-4 font-mono text-xs text-accent">
          <span className="text-accent/60">{"// "}</span>open source
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Repos.
        </h1>
        <p className="mt-5 max-w-xl text-fg-muted leading-relaxed">
          A curated selection of projects and tools I&apos;ve built or
          contributed to.
        </p>
      </header>

      {repos.length === 0 ? (
        <p className="font-mono text-sm text-fg-dim">
          {"// unable to load repositories right now"}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}

      <div className="mt-16 flex flex-col items-center gap-4 border-t border-rule pt-10 text-center">
        <p className="font-mono text-xs text-fg-dim">{"// want to see everything?"}</p>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-md border border-rule px-5 py-2.5 font-mono text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
        >
          <span aria-hidden className="text-fg-dim group-hover:text-accent">↗</span>
          view all on github
        </Link>
      </div>
    </div>
  );
}
