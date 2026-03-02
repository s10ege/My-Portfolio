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
    <div className="mx-auto max-w-3xl px-6 py-20">
      <FadeIn>
        <header className="mb-12">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Contact
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">Get in touch</h1>
          <p className="text-gray-400 max-w-lg leading-relaxed">
            Whether you have a question, a project idea, or just want to say
            hello — my inbox is open.
          </p>
        </header>
      </FadeIn>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <FadeIn delay={0.1}>
          <a
            href={siteConfig.links.email}
            className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              @
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Email</p>
              <p className="text-sm text-white">soneregeroglu18@hotmail.com</p>
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={0.15}>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              in
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">LinkedIn</p>
              <p className="text-sm text-white">soner-eroglu ↗</p>
            </div>
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white mb-6">
            Send a message
          </h2>
          <ContactForm />
        </div>
      </FadeIn>
    </div>
  );
}
