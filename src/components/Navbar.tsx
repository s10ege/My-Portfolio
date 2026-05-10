import Link from "next/link";
import { siteConfig } from "@/data/site";

const navLinks = [
  { href: "/projects", label: "projects" },
  { href: "/technologies", label: "tech" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-surface/75 backdrop-blur-xl backdrop-saturate-150">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center font-mono text-[0.92rem] font-medium text-fg transition-colors hover:text-accent"
        >
          <span>{siteConfig.name}</span>
          <span aria-hidden className="caret-thin ml-0.5 -translate-y-[1px] font-normal">
            ▍
          </span>
        </Link>

        <ul className="flex items-center gap-0.5" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="group relative inline-flex items-center px-3 py-1.5 font-mono text-[0.78rem] text-fg-muted transition-colors hover:text-fg"
              >
                <span aria-hidden className="text-fg-dim transition-colors group-hover:text-accent">
                  /
                </span>
                <span>{label}</span>
                <span
                  aria-hidden
                  className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
