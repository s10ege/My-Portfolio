import Link from "next/link";
import { siteConfig } from "@/data/site";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/repos", label: "Repos" },
  { href: "/technologies", label: "Tech" },
  { href: "/resume", label: "Resume" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-mono text-base font-semibold text-white hover:text-indigo-400 transition-colors"
          aria-label="Home"
        >
          {siteConfig.name}
          <span className="text-indigo-500">_</span>
        </Link>

        <ul className="flex items-center gap-1" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-md px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
