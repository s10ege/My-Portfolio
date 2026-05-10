import Link from "next/link";
import { siteConfig } from "@/data/site";

const footerLinks = [
  { href: siteConfig.links.github, label: "github", external: true },
  { href: siteConfig.links.linkedin, label: "linkedin", external: true },
  { href: "/contact", label: "email", external: false },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-xs text-fg-dim">
          <span className="text-fg-muted">©</span> {new Date().getFullYear()}{" "}
          <span className="text-fg-muted">{siteConfig.name}</span>
        </div>

        <nav aria-label="Footer links" className="flex items-center gap-1">
          {footerLinks.map(({ href, label, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-1 px-2 py-1 font-mono text-xs text-fg-muted transition-colors hover:text-accent"
            >
              <span>{label}</span>
              <span aria-hidden className="text-fg-dim transition-colors group-hover:text-accent">
                {external ? "↗" : "→"}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
