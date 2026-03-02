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
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const badge: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export function TechGroup({ category, items }: TechGroupProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref}>
      <motion.h2
        className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400 mb-4"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {category}
      </motion.h2>
      <motion.ul
        className="flex flex-wrap gap-2"
        role="list"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {items.map((tech) => (
          <motion.li
            key={tech.name}
            variants={badge}
            whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-gray-300 cursor-default"
          >
            <span>{tech.name}</span>
            {tech.notes && (
              <span className="text-xs text-gray-600">· {tech.notes}</span>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
