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
    <div className="relative pl-6 border-l border-white/[0.08]">
      <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-indigo-500 bg-[#0a0a0a]" />
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1.5">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-indigo-400 text-sm">{organization}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm text-gray-500 font-mono">{period}</p>
          {location && <p className="text-xs text-gray-600">{location}</p>}
        </div>
      </div>
      <ul className="space-y-1 mt-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
            <span className="text-indigo-500 mt-0.5 shrink-0">·</span>
            {b}
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
    <section aria-labelledby={`section-${title.toLowerCase()}`} className="mb-10">
      <h2
        id={`section-${title.toLowerCase()}`}
        className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-5"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header className="mb-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Soner Eroglu</h1>
          <p className="text-lg text-gray-400 mb-4">Computer Systems Engineering — Final Year Student</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>soneregeroglu18@hotmail.com</span>
<span>London, UK</span>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              LinkedIn ↗
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              GitHub ↗
            </Link>
          </div>
        </div>
        <Link
          href="/SonerEroglu_CV.PDF"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 transition-colors shrink-0"
        >
          Download PDF ↓
        </Link>
      </header>

      {/* Education */}
      <Section title="Education">
        <div className="space-y-7">
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

      {/* Projects */}
      <Section title="Projects">
        <div className="space-y-7">
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

      {/* Skills */}
      <Section title="Skills">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm text-gray-400">
          {[
            ["Languages", "Python, Java, C++, SQL"],
            ["Data & AI", "Pandas, NumPy, Scikit-learn, txtai, spaCy, Streamlit"],
            ["Frontend", "HTML, CSS, JavaSwing, JavaFX"],
            ["Systems", "Digital Systems, Microcontroller Systems"],
            ["Tooling", "Git, VS Code, JetBrains, Jupyter Notebook"],
            ["Spoken Languages", "Turkish (Fluent), English (Fluent), German (A1)"],
          ].map(([category, value]) => (
            <div key={category}>
              <p className="text-xs text-gray-600 mb-1">{category}</p>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
