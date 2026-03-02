"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/mdx";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: ProjectFrontmatter;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-colors duration-200"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-xs font-mono text-gray-500 mb-1">{project.date}</p>
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
              {project.title}
            </h3>
          </div>
          <span className="text-gray-600 group-hover:text-indigo-400 transition-colors mt-1 shrink-0">
            →
          </span>
        </div>

        <p className="text-sm text-gray-400 mb-3 leading-relaxed">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.stack.length > 5 && (
            <Badge>+{project.stack.length - 5}</Badge>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
