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
            BEng (Hons) Computer Systems Engineering — 2:1, Brunel University
            London.
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
      </header>

      <div className="space-y-14 border-t border-rule pt-12">
        <Section title="Education">
          <div className="space-y-9">
            <ResumeItem
              title="BEng (Hons) Computer Systems Engineering"
              organization="Brunel University London"
              period="2022 — 2026"
              location="London, UK"
              bullets={[
                "Graduated with Upper Second-Class Honours (2:1), 67.5%.",
                "IET-accredited degree — meets the academic requirement for Incorporated Engineer (IEng).",
                "Modules include: Object-Oriented Systems & Programming, Data Networks & Cyber Security, Computer Architecture & Interfacing, Applied AI & Machine Learning, Data & Information, Design of IoT (A*), Embedded Systems (B+).",
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

        <Section title="Experience">
          <div className="space-y-9">
            <ResumeItem
              title="Sales Associate"
              organization="Kapakli Kuyumculuk"
              period="Summers 2023 & 2024"
              location="Türkiye"
              bullets={[
                "Worked in a family-run goldsmith business, developing customer service and sales skills in a high-pressure retail environment.",
                "Supported and trained new staff members, developing leadership skills.",
                "Later designed and deployed KuyumApp (see Projects) to digitize the shop's transactions.",
              ]}
            />
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-9">
            <ResumeItem
              title="KuyumApp — Offline-First POS for Gold Jewelry Retail"
              organization="Solo project"
              period="2026 — Present"
              bullets={[
                "Desktop cash register and transaction management app (React, TypeScript, Tauri, Rust, SQLite) replacing paper ledgers — fully offline, no server required.",
                "In production at a family-run gold jewelry shop in a parallel-run pilot, validated against real daily records; roadmap includes gold price ingestion and multi-shop rollout.",
              ]}
            />
            <ResumeItem
              title="Final Year Project: AI-Driven Multi-Domain Search Engine"
              organization="Brunel University London"
              period="2025 — 2026"
              bullets={[
                "Hybrid semantic search over a ~9,000-document AI/ML corpus — FAISS dense retrieval, BM25 lexical search, and cross-encoder reranking, with a local RAG pipeline (Qwen3-0.6B) for grounded answers.",
                "Lifted ranking quality from nDCG@10 0.355 (BM25 baseline) to 0.828; validated with a 258-test automated suite, a full dissertation, and a conference-style poster.",
              ]}
            />
            <ResumeItem
              title="Smart Room Monitoring System"
              organization="Solo project"
              period="2026"
              bullets={[
                "Raspberry Pi monitoring system — DHT11 and HC-SR04 sensing over GPIO, a thread-safe multi-rate Python sensor layer, and a three-state alert engine driving LED and buzzer actuators.",
                "Exposed via a Flask REST API and React dashboard, accessible on the LAN and remotely via ngrok; ~2-hour endurance test with stable memory and no crashes.",
              ]}
            />
            <ResumeItem
              title="Embedded Home Monitoring System"
              organization="Brunel University London"
              period="2025"
              bullets={[
                "Team-built PIC16F18877 smart-home prototype — motion, temperature, and humidity sensing, keypad-secured alarm, LCD output, and servo doors; led the control-logic programming in Flowcode.",
                "Nominated for the Brunel Engineering Plus showcase event.",
              ]}
            />
            <ResumeItem
              title="Supermarket Management System"
              organization="Brunel University London"
              period="2025"
              bullets={[
                "Modular object-oriented retail and banking application in Java (Swing GUI), driven from UML design and verified against 25 documented use cases.",
              ]}
            />
          </div>
        </Section>

        <Section title="Leadership">
          <div className="space-y-9">
            <ResumeItem
              title="Founder & Chairman"
              organization="Brunel Turkish Society"
              period="2023 — Present"
              bullets={[
                "Established the society and lead its operations, organizing community and cultural events.",
              ]}
            />
            <ResumeItem
              title="Brunel Engineering Plus Nominee"
              organization="Brunel University London"
              period="2025"
              bullets={[
                "Recognized for innovation in the embedded home monitoring group project.",
              ]}
            />
          </div>
        </Section>

        <Section title="Skills">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {[
              [
                "Languages",
                "Python, TypeScript/JavaScript, Java, SQL, C++, C, Rust, Assembly",
              ],
              [
                "AI & Machine Learning",
                "Information retrieval (FAISS, BM25, cross-encoder reranking, BERT), RAG, LLMs, NLP, scikit-learn, spaCy, txtai, nDCG evaluation",
              ],
              [
                "Data & Databases",
                "pandas, NumPy, PostgreSQL, SQLite, data pipelines, web scraping, Jupyter",
              ],
              [
                "Web & Frameworks",
                "React, Next.js, Node.js, Tauri, Vite, Tailwind CSS, shadcn/ui, FastAPI, Flask, Streamlit, REST APIs",
              ],
              [
                "Software Engineering",
                "OOP, algorithms & data structures, concurrency & multithreading, automated testing (pytest), CI/CD (GitHub Actions), Docker, Agile, UML",
              ],
              [
                "Embedded & Hardware",
                "PIC microcontrollers, Raspberry Pi, Flowcode, sensor & actuator interfacing (ADC/PWM/GPIO), circuit design (NI Multisim), digital systems, computer architecture, FPGA fundamentals, IoT",
              ],
              [
                "Tools & Platforms",
                "Git/GitHub, Claude Code, VS Code, IntelliJ, Linux (Ubuntu), macOS, Windows",
              ],
              [
                "Responsible AI",
                "AI ethics, EU AI Act awareness, bias & fairness evaluation",
              ],
              [
                "Spoken Languages",
                "Turkish (Fluent), English (Fluent), German (A1)",
              ],
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
