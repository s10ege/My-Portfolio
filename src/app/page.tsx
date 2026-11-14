import Link from "next/link";
import { siteConfig } from "@/data/site";
import { getAllProjects } from "@/lib/mdx";
import { Cmd } from "@/tmux/SidePanes";
import { Fastfetch } from "@/tmux/Fastfetch";
import "@/tmux/glow.css";

// The home Window is a shell session: fastfetch, then the README and now.md rendered by glow.
export default function HomePage() {
  const featured = getAllProjects().slice(0, 3);

  return (
    <div className="flex flex-col gap-[1.5em]">
      <section>
        <Cmd>fastfetch</Cmd>
        <Fastfetch />
      </section>

      <section>
        <Cmd>glow README.md</Cmd>
        <article className="glow mt-[1em]">
          <h1>README</h1>
          <h2>{siteConfig.name}</h2>
          <p>
            Computer Systems Engineering graduate (BEng Hons, 2:1) from Brunel,
            based in London. I build software from microcontrollers to machine
            learning.
          </p>
          <h3>Featured</h3>
          <table>
            <thead>
              <tr>
                <th>project</th>
                <th>year</th>
                <th>stack</th>
              </tr>
            </thead>
            <tbody>
              {featured.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <Link href={`/projects/${p.slug}`}>{p.slug}</Link>
                  </td>
                  <td>{p.date.slice(0, 4)}</td>
                  <td>{p.stack.slice(0, 3).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul>
            <li>
              <Link href="/projects">projects</Link> - all case studies
            </li>
            <li>
              <Link href="/resume">resume</Link> - education, experience, skills
            </li>
            <li>
              <Link href="/contact">contact</Link> - get in touch
            </li>
          </ul>
        </article>
      </section>

      <section>
        <Cmd>glow now.md</Cmd>
        <article className="glow mt-[1em]">
          <h1>now</h1>
          <ul>
            <li>Looking for graduate software engineering roles in London.</li>
            <li>Running KuyumApp in production at a jewellery shop.</li>
            <li>Rebuilding this site as a copy of my tmux setup.</li>
          </ul>
          <p className="glow-dim">updated November 2026</p>
        </article>
      </section>
    </div>
  );
}
