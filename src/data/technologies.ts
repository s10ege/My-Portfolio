export type TechCategory =
  | "Languages"
  | "AI & Machine Learning"
  | "Data & Databases"
  | "Web & Frameworks"
  | "Software Engineering"
  | "Embedded & Hardware"
  | "Tools & Platforms"
  | "Responsible AI"
  | "Spoken Languages";

export interface Technology {
  name: string;
  category: TechCategory;
  notes?: string;
}

export const technologies: Technology[] = [
  // Languages
  { name: "Python", category: "Languages" },
  { name: "TypeScript/JavaScript", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "C", category: "Languages" },
  { name: "Rust", category: "Languages", notes: "project exposure" },
  { name: "Assembly", category: "Languages" },

  // AI & Machine Learning
  { name: "Information Retrieval", category: "AI & Machine Learning" },
  { name: "FAISS", category: "AI & Machine Learning" },
  { name: "BM25", category: "AI & Machine Learning" },
  { name: "Cross-encoder Reranking", category: "AI & Machine Learning" },
  { name: "RAG", category: "AI & Machine Learning" },
  { name: "LLMs", category: "AI & Machine Learning" },
  { name: "NLP", category: "AI & Machine Learning" },
  { name: "BERT", category: "AI & Machine Learning" },
  { name: "spaCy", category: "AI & Machine Learning" },
  { name: "txtai", category: "AI & Machine Learning" },
  { name: "scikit-learn", category: "AI & Machine Learning" },
  { name: "Evaluation Metrics (nDCG)", category: "AI & Machine Learning" },

  // Data & Databases
  { name: "pandas", category: "Data & Databases" },
  { name: "NumPy", category: "Data & Databases" },
  { name: "PostgreSQL", category: "Data & Databases" },
  { name: "SQLite", category: "Data & Databases" },
  { name: "Data Pipelines", category: "Data & Databases" },
  { name: "Web Scraping", category: "Data & Databases" },
  { name: "Jupyter", category: "Data & Databases" },

  // Web & Frameworks
  { name: "React", category: "Web & Frameworks" },
  { name: "Next.js", category: "Web & Frameworks" },
  { name: "Node.js", category: "Web & Frameworks" },
  { name: "Tauri", category: "Web & Frameworks" },
  { name: "Vite", category: "Web & Frameworks" },
  { name: "Tailwind CSS", category: "Web & Frameworks" },
  { name: "shadcn/ui", category: "Web & Frameworks" },
  { name: "FastAPI", category: "Web & Frameworks" },
  { name: "Flask", category: "Web & Frameworks" },
  { name: "Streamlit", category: "Web & Frameworks" },
  { name: "REST APIs", category: "Web & Frameworks" },

  // Software Engineering
  { name: "OOP", category: "Software Engineering" },
  { name: "Algorithms & Data Structures", category: "Software Engineering" },
  { name: "Concurrency & Multithreading", category: "Software Engineering" },
  { name: "Automated Testing (pytest)", category: "Software Engineering" },
  { name: "CI/CD (GitHub Actions)", category: "Software Engineering" },
  { name: "Docker", category: "Software Engineering" },
  { name: "Agile Development", category: "Software Engineering" },
  { name: "UML", category: "Software Engineering" },

  // Embedded & Hardware
  { name: "PIC Microcontrollers", category: "Embedded & Hardware" },
  { name: "Raspberry Pi", category: "Embedded & Hardware" },
  { name: "Flowcode", category: "Embedded & Hardware" },
  { name: "Sensor & Actuator Interfacing", category: "Embedded & Hardware" },
  { name: "ADC / PWM / GPIO", category: "Embedded & Hardware" },
  { name: "Circuit Design (NI Multisim)", category: "Embedded & Hardware" },
  { name: "Breadboard Prototyping", category: "Embedded & Hardware" },
  { name: "Digital Systems", category: "Embedded & Hardware" },
  { name: "Computer Architecture", category: "Embedded & Hardware" },
  { name: "FPGA Fundamentals", category: "Embedded & Hardware" },
  { name: "IoT", category: "Embedded & Hardware" },

  // Tools & Platforms
  { name: "Git / GitHub", category: "Tools & Platforms" },
  { name: "Claude Code", category: "Tools & Platforms" },
  { name: "VS Code", category: "Tools & Platforms" },
  { name: "IntelliJ", category: "Tools & Platforms" },
  { name: "Linux (Ubuntu)", category: "Tools & Platforms" },
  { name: "macOS", category: "Tools & Platforms" },
  { name: "Windows", category: "Tools & Platforms" },

  // Responsible AI
  { name: "AI Ethics", category: "Responsible AI" },
  { name: "EU AI Act Awareness", category: "Responsible AI" },
  { name: "Bias & Fairness Evaluation", category: "Responsible AI" },

  // Spoken Languages
  { name: "Turkish", category: "Spoken Languages", notes: "Fluent" },
  { name: "English", category: "Spoken Languages", notes: "Fluent" },
  { name: "German", category: "Spoken Languages", notes: "A1" },
];
