"use client";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import type { Technology, TechCategory } from "@/data/technologies";

interface TechGroupProps {
  category: TechCategory;
  items: Technology[];
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function TechGroup({ category, items }: TechGroupProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-[180px_1fr] sm:gap-10">
      <motion.h2
        className="font-mono text-xs lowercase tracking-wide text-fg-dim sm:pt-2"
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className="text-accent/70">{"// "}</span>
        {category.toLowerCase()}
      </motion.h2>

      <motion.ul
        className="flex flex-wrap gap-1.5"
        role="list"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {items.map((tech) => (
          <motion.li key={tech.name} variants={item}>
            <span className="group inline-flex items-baseline gap-1.5 chip-code transition-colors hover:border-accent/40 hover:text-accent">
              <span>{tech.name}</span>
              {tech.notes && (
                <span className="text-fg-dim transition-colors group-hover:text-fg-muted">
                  · {tech.notes}
                </span>
              )}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
