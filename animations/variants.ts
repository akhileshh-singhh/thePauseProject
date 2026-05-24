import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const softScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export const floatSlow = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  },
};
