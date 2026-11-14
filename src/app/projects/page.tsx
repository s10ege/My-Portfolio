import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import { siteConfig } from "@/data/site";
import "@/tmux/glow.css";

export const metadata: Metadata = {
  title: "Projects",
  description: `Hand-crafted case studies from projects built by ${siteConfig.name}.`,
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <article className="glow">
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.slug}>
                <td>{p.date}</td>
                <td>
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </td>
                <td>{p.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  );
}
