"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/mdx";

interface ProjectCardProps {
  project: ProjectFrontmatter;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const visibleStack = project.stack.slice(0, 4);
  const overflow = project.stack.length - visibleStack.length;

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18, ease: "easeOut" }}>
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-surface-1/40 transition-colors duration-200 hover:border-rule-strong hover:bg-surface-1"
      >
        {/* Left amber rail — grows on hover */}
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
        />

        {/* Filename header */}
        <div className="flex items-center justify-between gap-3 border-b border-rule bg-surface/40 px-4 py-2.5">
          <p className="truncate font-mono text-[0.72rem] text-fg-muted">
            <span className="text-fg-dim">projects/</span>
            <span className="text-fg">{project.slug}</span>
            <span className="text-fg-dim">.mdx</span>
          </p>
          <p className="shrink-0 font-mono text-[0.7rem] text-fg-dim">{project.date}</p>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {project.tagline}
            </p>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-1.5">
            {visibleStack.map((tech) => (
              <span key={tech} className="chip-code">
                {tech}
              </span>
            ))}
            {overflow > 0 && (
              <span className="font-mono text-[0.72rem] text-fg-dim">+{overflow}</span>
            )}
          </div>
        </div>

        {/* Footer arrow */}
        <div className="flex items-center justify-between gap-3 border-t border-rule px-5 py-2.5">
          <span className="font-mono text-[0.7rem] text-fg-dim group-hover:text-fg-muted">
            read case study
          </span>
          <span
            aria-hidden
            className="font-mono text-sm text-fg-dim transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
