export type TechCategory =
  | "Languages"
  | "Data & AI"
  | "Frontend"
  | "Systems"
  | "Platforms & Tools"
  | "Tooling"
  | "Spoken Languages";

export interface Technology {
  name: string;
  category: TechCategory;
  notes?: string;
}

export const technologies: Technology[] = [
  // Languages
  { name: "Python", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "SQL", category: "Languages" },

  // Data & AI
  { name: "Machine Learning", category: "Data & AI" },
  { name: "Pandas", category: "Data & AI" },
  { name: "NumPy", category: "Data & AI" },
  { name: "Scikit-learn", category: "Data & AI" },
  { name: "txtai", category: "Data & AI" },
  { name: "spaCy", category: "Data & AI" },
  { name: "Streamlit", category: "Data & AI" },

  // Frontend
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "JavaSwing", category: "Frontend" },
  { name: "JavaFX", category: "Frontend" },

  // Systems
  { name: "Digital Systems", category: "Systems" },
  { name: "Microcontroller Systems", category: "Systems" },

  // Platforms & Tools
  { name: "Windows", category: "Platforms & Tools" },
  { name: "macOS", category: "Platforms & Tools" },
  { name: "Ubuntu", category: "Platforms & Tools" },
  { name: "Microsoft Office", category: "Platforms & Tools" },

  // Tooling
  { name: "Git", category: "Tooling" },
  { name: "VS Code", category: "Tooling" },
  { name: "JetBrains", category: "Tooling" },
  { name: "Jupyter Notebook", category: "Tooling" },

  // Spoken Languages
  { name: "Turkish", category: "Spoken Languages", notes: "Fluent" },
  { name: "English", category: "Spoken Languages", notes: "Fluent" },
  { name: "German", category: "Spoken Languages", notes: "A1" },
];
