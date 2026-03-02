import Link from "next/link";
import type { EnrichedRepo } from "@/lib/github";
import { Badge } from "./Badge";

interface RepoCardProps {
  repo: EnrichedRepo;
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M6 9v2a3 3 0 003 3h6a3 3 0 003-3V9" />
    </svg>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function RepoCard({ repo }: RepoCardProps) {
  const title = repo.customTitle ?? repo.name;

  return (
    <article className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-semibold text-white font-mono text-sm">{title}</h3>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs text-gray-500 hover:text-indigo-400 transition-colors border border-white/10 rounded px-2 py-0.5"
          aria-label={`View ${title} on GitHub`}
        >
          GitHub ↗
        </Link>
      </div>

      {repo.highlight && (
        <p className="text-xs text-indigo-400 mb-2">{repo.highlight}</p>
      )}

      {repo.description && (
        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
          {repo.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 mt-auto pt-2 text-xs text-gray-500">
        {repo.language && (
          <Badge variant="language">{repo.language}</Badge>
        )}

        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <StarIcon />
            {repo.stargazers_count}
          </span>
        )}

        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <ForkIcon />
            {repo.forks_count}
          </span>
        )}

        <span className="ml-auto">Updated {formatDate(repo.updated_at)}</span>
      </div>
    </article>
  );
}
