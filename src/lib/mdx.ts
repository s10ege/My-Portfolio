import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  tagline: string;
  date: string; // YYYY-MM
  stack: string[];
  role: string;
  highlights: string[];
  links: {
    github?: string;
    demo?: string;
    article?: string;
  };
  repo?: string;
  coverImage?: string;
  gallery?: string[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export function getAllProjects(): ProjectFrontmatter[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        ...(data as Omit<ProjectFrontmatter, "slug">),
        slug: file.replace(/\.mdx$/, ""),
      } as ProjectFrontmatter;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    ...(data as Omit<ProjectFrontmatter, "slug">),
    slug,
    content,
  } as Project;
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
