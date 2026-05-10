import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16 pb-20 sm:pt-20">
      <FadeIn>
        <header className="mb-12">
          <p className="mb-4 font-mono text-xs text-accent">
            <span className="text-accent/60">{"// "}</span>contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Get in{" "}
            <span className="font-display font-normal italic text-accent">touch</span>.
          </h1>
          <p className="mt-5 max-w-lg text-fg-muted leading-relaxed">
            Whether you have a question, a project idea, or just want to say
            hello — my inbox is open.
          </p>
        </header>
      </FadeIn>

      <div className="mb-12 grid gap-3 sm:grid-cols-2">
        <FadeIn delay={0.1}>
          <a
            href={siteConfig.links.email}
            className="group flex items-center gap-4 rounded-lg border border-rule bg-surface-1/40 px-5 py-4 transition-colors hover:border-rule-strong hover:bg-surface-1"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-rule bg-surface font-mono text-sm text-accent transition-colors group-hover:border-accent/40">
              @
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim">
                email
              </p>
              <p className="truncate text-sm text-fg">soneregeroglu18@hotmail.com</p>
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={0.15}>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-lg border border-rule bg-surface-1/40 px-5 py-4 transition-colors hover:border-rule-strong hover:bg-surface-1"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-rule bg-surface font-mono text-xs text-accent transition-colors group-hover:border-accent/40">
              in
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim">
                linkedin
              </p>
              <p className="truncate text-sm text-fg">soner-eroglu ↗</p>
            </div>
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="rounded-lg border border-rule bg-surface-1/40 p-6 sm:p-8">
          <p className="mb-1 font-mono text-xs text-accent">
            <span className="text-accent/60">{"// "}</span>send a message
          </p>
          <h2 className="mb-7 text-xl font-semibold tracking-tight text-fg">
            Drop a line.
          </h2>
          <ContactForm />
        </div>
      </FadeIn>
    </div>
  );
}
