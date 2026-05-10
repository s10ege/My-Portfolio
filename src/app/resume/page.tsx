import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Professional experience and background of ${siteConfig.name}.`,
};

interface ResumeItemProps {
  title: string;
  organization: string;
  period: string;
  location?: string;
  bullets: string[];
}

function ResumeItem({
  title,
  organization,
  period,
  location,
  bullets,
}: ResumeItemProps) {
  return (
    <div className="relative pl-6 border-l border-rule">
      <span
        aria-hidden
        className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-surface"
      />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h3 className="text-[1.05rem] font-semibold tracking-tight text-fg">
            {title}
          </h3>
          <p className="mt-0.5 text-sm text-accent">{organization}</p>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="font-mono text-xs text-fg-muted">{period}</p>
          {location && (
            <p className="mt-0.5 font-mono text-[0.7rem] text-fg-dim">{location}</p>
          )}
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted"
          >
            <span aria-hidden className="mt-1.5 inline-block h-px w-3 shrink-0 bg-fg-dim" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section
      aria-labelledby={`section-${title.toLowerCase()}`}
      className="grid gap-6 sm:grid-cols-[180px_1fr] sm:gap-10"
    >
      <h2
        id={`section-${title.toLowerCase()}`}
        className="font-mono text-xs lowercase tracking-wide text-fg-dim sm:pt-1"
      >
        <span className="text-accent/70">{"// "}</span>
        {title.toLowerCase()}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-20 sm:pt-20">
      {/* Header */}
      <header className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 font-mono text-xs text-accent">
            <span className="text-accent/60">{"// "}</span>resume
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Soner Eroglu.
          </h1>
          <p className="mt-3 text-lg text-fg-muted">
            Computer Systems Engineering — Final-year student.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-fg-muted">
            <span>soneregeroglu18@hotmail.com</span>
            <span className="text-fg-dim">·</span>
            <span>London, UK</span>
            <span className="text-fg-dim">·</span>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              linkedin ↗
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              github ↗
            </Link>
          </div>
        </div>
        <Link
          href="/SonerEroglu_CV.PDF"
          target="_blank"
          className="group inline-flex shrink-0 items-center gap-2 rounded-md border border-rule px-4 py-2.5 font-mono text-xs text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
        >
          <span aria-hidden className="text-fg-dim group-hover:text-accent">↓</span>
          download cv.pdf
        </Link>
      </header>

      <div className="space-y-14 border-t border-rule pt-12">
        <Section title="Education">
          <div className="space-y-9">
            <ResumeItem
              title="BEng Computer Systems Engineering"
              organization="Brunel University London"
              period="2022 — Present"
              location="London, UK"
              bullets={[
                "Expected second class first honours.",
                "Modules include: Applied AI and Machine Learning, Autonomous Systems Design, Embedded Systems, Design for Internet of Things.",
              ]}
            />
            <ResumeItem
              title="High School"
              organization="Cozum Academy Cerkezkoy"
              period="2018 — 2022"
              location="Turkey"
              bullets={[
                "Graduated with overall 95% grade.",
                "Standout modules: Mathematics (96%) and English (98%).",
              ]}
            />
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-9">
            <ResumeItem
              title="Final Year Project: AI-Driven Multi-Domain Search Engine"
              organization="Brunel University London"
              period="2025 — Present"
              bullets={[
                "Developing an intelligent search system capable of parsing natural language queries across multiple databases (CSV or MySQL).",
                "Integrates Natural Language Processing (NLP) and AI-based ranking algorithms for semantic search.",
                "Design of a graphical user interface (GUI) for interactive search and domain filtering (e.g., technology, science).",
              ]}
            />
            <ResumeItem
              title="Microcontroller Design Group Project"
              organization="Brunel University London"
              period="2025"
              bullets={[
                "Collaborated with a team to design and implement a microcontroller-based solution.",
                "Applied programming concepts and system design principles to create functional prototypes.",
                "Documented project progress and technical specifications through professional report.",
                "Nominated for the Brunel Engineering Plus showcase event.",
              ]}
            />
          </div>
        </Section>

        <Section title="Skills">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {[
              ["Languages", "Python, Java, C++, SQL"],
              ["Data & AI", "Pandas, NumPy, Scikit-learn, txtai, spaCy, Streamlit"],
              ["Frontend", "HTML, CSS, JavaSwing, JavaFX"],
              ["Systems", "Digital Systems, Microcontroller Systems"],
              ["Tooling", "Git, VS Code, JetBrains, Jupyter Notebook"],
              ["Spoken Languages", "Turkish (Fluent), English (Fluent), German (A1)"],
            ].map(([category, value]) => (
              <div key={category}>
                <dt className="mb-1 font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim">
                  {category}
                </dt>
                <dd className="text-sm text-fg-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>
    </div>
  );
}
