import Link from "next/link";
import { siteConfig } from "@/data/site";
import "@/tmux/glow.css";

export default function HomePage() {
  return (
    <article className="glow">
      <h1>README</h1>
      <h2>{siteConfig.name}</h2>
      <p>
        Computer Systems Engineering graduate (BEng Hons, 2:1) from Brunel,
        based in London. I build software from microcontrollers to machine
        learning.
      </p>
      <ul>
        <li>
          <Link href="/projects">projects</Link> - case studies
        </li>
        <li>
          <Link href="/resume">resume</Link> - education, experience, skills
        </li>
        <li>
          <Link href="/contact">contact</Link> - get in touch
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <a href={siteConfig.links.github}>{siteConfig.links.github}</a>
        </li>
        <li>
          <a href={siteConfig.links.linkedin}>{siteConfig.links.linkedin}</a>
        </li>
      </ul>
    </article>
  );
}
