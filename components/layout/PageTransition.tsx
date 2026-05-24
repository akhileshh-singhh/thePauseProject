"use client";

import { motion, useReducedMotion } from "framer-motion";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className="flex min-h-screen flex-col">{children}</div>;
  }

  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
