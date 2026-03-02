export interface FeaturedRepoConfig {
  name: string;
  pinOrder: number;
  customTitle?: string;
  highlight?: string;
  hide?: boolean;
}

export const featuredRepos: FeaturedRepoConfig[] = [
  {
    name: "Multi-Domain-Search-Engine",
    pinOrder: 1,
    customTitle: "Multi-Domain Search Engine",
    highlight: "Semantic search · RAG · txtai · Python — Dissertation project",
  },
  {
    name: "portfolio",
    pinOrder: 2,
    customTitle: "This Portfolio",
    highlight: "Next.js App Router · TypeScript · Tailwind CSS",
  },
];
