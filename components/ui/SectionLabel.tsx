"use client";

import { motion } from "framer-motion";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`font-accent text-xs font-semibold uppercase tracking-[0.28em] text-tp-stone ${className}`}
    >
      {children}
    </motion.p>
  );
}
