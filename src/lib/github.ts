import { featuredRepos, type FeaturedRepoConfig } from "@/data/featuredRepos";
import { siteConfig } from "@/data/site";

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
}

export interface EnrichedRepo extends FeaturedRepoConfig, GitHubRepo {}

async function fetchRepo(repoName: string): Promise<GitHubRepo | null> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${siteConfig.githubUsername}/${repoName}`,
    {
      headers,
      next: { revalidate: 43200 }, // 12 hours
    }
  );

  if (!res.ok) {
    console.warn(
      `GitHub fetch failed for ${repoName}: ${res.status} ${res.statusText}`
    );
    return null;
  }

  return res.json() as Promise<GitHubRepo>;
}

export async function getFeaturedRepos(): Promise<EnrichedRepo[]> {
  const configs = featuredRepos.filter((r) => !r.hide);

  const results = await Promise.allSettled(
    configs.map(async (config) => {
      const ghData = await fetchRepo(config.name);
      if (!ghData) return null;
      const merged: EnrichedRepo = { ...ghData, ...config };
      return merged;
    })
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<EnrichedRepo> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value)
    .sort((a, b) => a.pinOrder - b.pinOrder);
}
