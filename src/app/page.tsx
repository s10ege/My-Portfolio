import Link from "next/link";
import { getAllProjects } from "@/lib/mdx";
import { Cmd, ContribGraph } from "@/tmux/GhGraph";
import { Fastfetch } from "@/tmux/Fastfetch";
import "@/tmux/glow.css";

// The home Window is a short shell session: fastfetch, gh graph, then one compact README.
export default function HomePage() {
  const featured = getAllProjects().slice(0, 3);

  return (
    <div className="flex flex-col gap-[1em]">
      <section>
        <Cmd>fastfetch</Cmd>
        <Fastfetch />
      </section>

      <section>
        <ContribGraph />
      </section>

      <section>
        <Cmd>glow README.md</Cmd>
        <article className="glow mt-[1em] [&>*+*]:!mt-[1em]">
          <h3>Featured</h3>
          <table>
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
          <h3>Now</h3>
          <ul>
            <li>Looking for graduate software engineering roles in London.</li>
            <li>Running KuyumApp in production at a jewellery shop.</li>
          </ul>
          <p>
            <Link href="/projects">projects</Link> · <Link href="/resume">resume</Link> ·{" "}
            <Link href="/contact">contact</Link>
          </p>
        </article>
      </section>
    </div>
  );
}
