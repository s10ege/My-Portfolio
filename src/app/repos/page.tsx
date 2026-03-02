import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedRepos } from "@/lib/github";
import { RepoCard } from "@/components/RepoCard";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Repos",
  description: `Curated open-source repositories by ${siteConfig.githubUsername}.`,
};

export default async function ReposPage() {
  const repos = await getFeaturedRepos();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-14">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-3">
          Open Source
        </p>
        <h1 className="text-4xl font-bold text-white mb-4">Repos</h1>
        <p className="text-gray-400 max-w-lg">
          A curated selection of projects and tools I&apos;ve built or
          contributed to.
        </p>
      </header>

      {repos.length === 0 ? (
        <p className="text-gray-500">Unable to load repositories right now.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-gray-500 mb-4 text-sm">Want to see everything?</p>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 transition-colors"
        >
          View all on GitHub ↗
        </Link>
      </div>
    </div>
  );
}
