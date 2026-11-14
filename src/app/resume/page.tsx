import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import "@/tmux/glow.css";

export const metadata: Metadata = {
  title: "Resume",
  description: `Professional experience and background of ${siteConfig.name}.`,
};

interface Item {
  title: string;
  org: string;
  period: string;
  loc: string;
  bullets: string[];
}

interface SectionData {
  name: string;
  items?: Item[];
  skills?: [string, string][];
}

const sections: SectionData[] = [
  {
    "name": "Education",
    "items": [
      {
        "title": "BEng (Hons) Computer Systems Engineering",
        "org": "Brunel University London",
        "period": "2022 - 2026",
        "loc": "London, UK",
        "bullets": [
          "Graduated with Upper Second-Class Honours (2:1), 67.5%.",
          "IET-accredited degree - meets the academic requirement for Incorporated Engineer (IEng).",
          "Modules include: Object-Oriented Systems & Programming, Data Networks & Cyber Security, Computer Architecture & Interfacing, Applied AI & Machine Learning, Data & Information, Design of IoT (A*), Embedded Systems (B+)."
        ]
      },
      {
        "title": "High School",
        "org": "Cozum Academy Cerkezkoy",
        "period": "2018 - 2022",
        "loc": "Turkey",
        "bullets": [
          "Graduated with overall 95% grade.",
          "Standout modules: Mathematics (96%) and English (98%)."
        ]
      }
    ]
  },
  {
    "name": "Experience",
    "items": [
      {
        "title": "Sales Associate",
        "org": "Kapakli Kuyumculuk",
        "period": "Summers 2023 & 2024",
        "loc": "Türkiye",
        "bullets": [
          "Worked in a family-run goldsmith business, developing customer service and sales skills in a high-pressure retail environment.",
          "Supported and trained new staff members, developing leadership skills.",
          "Later designed and deployed KuyumApp (see Projects) to digitize the shop's transactions."
        ]
      }
    ]
  },
  {
    "name": "Projects",
    "items": [
      {
        "title": "KuyumApp - Offline-First POS for Gold Jewelry Retail",
        "org": "Solo project",
        "period": "2026 - Present",
        "loc": "",
        "bullets": [
          "Desktop cash register and transaction management app (React, TypeScript, Tauri, Rust, SQLite) replacing paper ledgers - fully offline, no server required.",
          "In production at a family-run gold jewelry shop in a parallel-run pilot, validated against real daily records; roadmap includes gold price ingestion and multi-shop rollout."
        ]
      },
      {
        "title": "Final Year Project: AI-Driven Multi-Domain Search Engine",
        "org": "Brunel University London",
        "period": "2025 - 2026",
        "loc": "",
        "bullets": [
          "Hybrid semantic search over a ~9,000-document AI/ML corpus - FAISS dense retrieval, BM25 lexical search, and cross-encoder reranking, with a local RAG pipeline (Qwen3-0.6B) for grounded answers.",
          "Lifted ranking quality from nDCG@10 0.355 (BM25 baseline) to 0.828; validated with a 258-test automated suite, a full dissertation, and a conference-style poster."
        ]
      },
      {
        "title": "Smart Room Monitoring System",
        "org": "Solo project",
        "period": "2026",
        "loc": "",
        "bullets": [
          "Raspberry Pi monitoring system - DHT11 and HC-SR04 sensing over GPIO, a thread-safe multi-rate Python sensor layer, and a three-state alert engine driving LED and buzzer actuators.",
          "Exposed via a Flask REST API and React dashboard, accessible on the LAN and remotely via ngrok; ~2-hour endurance test with stable memory and no crashes."
        ]
      },
      {
        "title": "Embedded Home Monitoring System",
        "org": "Brunel University London",
        "period": "2025",
        "loc": "",
        "bullets": [
          "Team-built PIC16F18877 smart-home prototype - motion, temperature, and humidity sensing, keypad-secured alarm, LCD output, and servo doors; led the control-logic programming in Flowcode.",
          "Nominated for the Brunel Engineering Plus showcase event."
        ]
      },
      {
        "title": "Supermarket Management System",
        "org": "Brunel University London",
        "period": "2025",
        "loc": "",
        "bullets": [
          "Modular object-oriented retail and banking application in Java (Swing GUI), driven from UML design and verified against 25 documented use cases."
        ]
      }
    ]
  },
  {
    "name": "Leadership",
    "items": [
      {
        "title": "Founder & Chairman",
        "org": "Brunel Turkish Society",
        "period": "2023 - Present",
        "loc": "",
        "bullets": [
          "Established the society and lead its operations, organizing community and cultural events."
        ]
      },
      {
        "title": "Brunel Engineering Plus Nominee",
        "org": "Brunel University London",
        "period": "2025",
        "loc": "",
        "bullets": [
          "Recognized for innovation in the embedded home monitoring group project."
        ]
      }
    ]
  },
  {
    "name": "Skills",
    "skills": [
      [
        "Languages",
        "Python, TypeScript/JavaScript, Java, SQL, C++, C, Rust, Assembly"
      ],
      [
        "AI & Machine Learning",
        "Information retrieval (FAISS, BM25, cross-encoder reranking, BERT), RAG, LLMs, NLP, scikit-learn, spaCy, txtai, nDCG evaluation"
      ],
      [
        "Data & Databases",
        "pandas, NumPy, PostgreSQL, SQLite, data pipelines, web scraping, Jupyter"
      ],
      [
        "Web & Frameworks",
        "React, Next.js, Node.js, Tauri, Vite, Tailwind CSS, shadcn/ui, FastAPI, Flask, Streamlit, REST APIs"
      ],
      [
        "Software Engineering",
        "OOP, algorithms & data structures, concurrency & multithreading, automated testing (pytest), CI/CD (GitHub Actions), Docker, Agile, UML"
      ],
      [
        "Embedded & Hardware",
        "PIC microcontrollers, Raspberry Pi, Flowcode, sensor & actuator interfacing (ADC/PWM/GPIO), circuit design (NI Multisim), digital systems, computer architecture, FPGA fundamentals, IoT"
      ],
      [
        "Tools & Platforms",
        "Git/GitHub, Claude Code, VS Code, IntelliJ, Linux (Ubuntu), macOS, Windows"
      ],
      [
        "Responsible AI",
        "AI ethics, EU AI Act awareness, bias & fairness evaluation"
      ],
      [
        "Spoken Languages",
        "Turkish (Fluent), English (Fluent), German (A1)"
      ]
    ]
  }
];

export default function ResumePage() {
  return (
    <article className="glow">
      <h1>Resume</h1>
      <p>
        BEng (Hons) Computer Systems Engineering - 2:1, Brunel University
        London.
      </p>
      <ul>
        <li>{siteConfig.links.email.replace("mailto:", "")}</li>
        <li>London, UK</li>
        <li>
          <a href={siteConfig.links.linkedin}>{siteConfig.links.linkedin}</a>
        </li>
        <li>
          <a href={siteConfig.links.github}>{siteConfig.links.github}</a>
        </li>
      </ul>
      {sections.map((sec) => (
        <section key={sec.name} className="glow-section">
          <h2>{sec.name}</h2>
          {sec.items?.map((it) => (
            <div key={it.title}>
              <h3>{it.title}</h3>
              <p>
                <strong>{it.org}</strong> | {it.period}
                {it.loc && ` | ${it.loc}`}
              </p>
              <ul>
                {it.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
          {sec.skills && (
            <ul>
              {sec.skills.map(([k, v]) => (
                <li key={k}>
                  <strong>{k}:</strong> {v}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
