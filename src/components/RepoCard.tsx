"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { EnrichedRepo } from "@/lib/github";
import { siteConfig } from "@/data/site";
import { Badge } from "./Badge";

interface RepoCardProps {
  repo: EnrichedRepo;
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M6 9v2a3 3 0 003 3h6a3 3 0 003-3V9" />
    </svg>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function RepoCard({ repo }: RepoCardProps) {
  const title = repo.customTitle ?? repo.name;

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-surface-1/40 transition-colors duration-200 hover:border-rule-strong hover:bg-surface-1"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
      />

      {/* Repo path header */}
      <div className="flex items-center justify-between gap-3 border-b border-rule bg-surface/40 px-4 py-2.5">
        <p className="truncate font-mono text-[0.72rem] text-fg-muted">
          <span className="text-fg-dim">{siteConfig.githubUsername}/</span>
          <span className="text-fg">{repo.name}</span>
        </p>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} on GitHub`}
          className="shrink-0 font-mono text-[0.7rem] text-fg-dim transition-colors hover:text-accent"
        >
          ↗
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[1rem] font-semibold tracking-tight text-fg">
          {title}
        </h3>

        {repo.highlight && (
          <p className="font-mono text-[0.72rem] text-accent/80">
            <span className="text-accent/60">{"// "}</span>
            {repo.highlight}
          </p>
        )}

        {repo.description && (
          <p className="text-sm leading-relaxed text-fg-muted">
            {repo.description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 font-mono text-[0.72rem] text-fg-dim">
          {repo.language && <Badge variant="language">{repo.language}</Badge>}
          {repo.stargazers_count > 0 && (
            <span className="inline-flex items-center gap-1">
              <StarIcon /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="inline-flex items-center gap-1">
              <ForkIcon /> {repo.forks_count}
            </span>
          )}
          <span className="ml-auto">updated {formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </motion.article>
  );
}
