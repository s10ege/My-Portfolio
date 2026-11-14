import Link from "next/link";
import { siteConfig } from "@/data/site";
import { getAllProjects } from "@/lib/mdx";

function Cmd({ children }: { children: string }) {
  return (
    <div>
      <span className="text-[var(--t-green)]">~</span> <span className="text-[var(--t-blue)]">%</span> {children}
    </div>
  );
}

const link = "text-[var(--t-cyan)] underline";

export function Whoami() {
  const { links } = siteConfig;
  return (
    <div className="whitespace-pre-wrap break-words">
      <Cmd>whoami</Cmd>
      <div>{siteConfig.name}</div>
      <div>Software Developer</div>
      <div className="text-[var(--t-brightblack)]">Computer Systems Eng. grad</div>
      <div>London</div>
      <div>
        <a className={link} href={links.github}>github</a>{" "}
        <a className={link} href={links.linkedin}>linkedin</a>{" "}
        <a className={link} href={links.email}>email</a>
      </div>
    </div>
  );
}

const LOG: [string, string, string][] = [
  ["a3f9c1e", "feat(resume): graduate rewrite", "2 days ago"],
  ["7b2d04a", "feat(home): update hero and CTA", "2 days ago"],
  ["c81e5f3", "feat(skills): 9-category scheme", "5 days ago"],
  ["1d6a9b7", "fix(projects): case study layout", "1 week ago"],
  ["e402c3d", "feat(content): search engine study", "2 weeks ago"],
  ["5fa7810", "chore: bump dependencies", "3 weeks ago"],
  ["92b3de6", "feat(embedded): add rtos writeup", "1 month ago"],
  ["0c4e7a2", "fix(site): canonical url", "1 month ago"],
  ["b7195d8", "feat(contact): add form", "2 months ago"],
  ["3e8a0f4", "initial commit", "3 months ago"],
];

export function GitLog() {
  return (
    <div className="whitespace-nowrap">
      <Cmd>git log --oneline</Cmd>
      {LOG.map(([hash, msg, when]) => (
        <div key={hash}>
          <span className="text-[var(--t-yellow)]">{hash}</span> {msg}{" "}
          <span className="text-[var(--t-brightblack)]">({when})</span>
        </div>
      ))}
    </div>
  );
}

export function LsProjects() {
  const projects = getAllProjects();
  return (
    <div>
      <Cmd>ls ~/projects</Cmd>
      <div className="flex flex-wrap gap-x-[2ch]">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="font-bold text-[var(--t-blue)]">
            {p.slug}
          </Link>
        ))}
      </div>
    </div>
  );
}
