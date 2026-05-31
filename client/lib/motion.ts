import { Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.15, ease: "easeIn" } },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.2, ease: "easeOut" } },
};

export const listVariants: Variants = {
  animate: { transition: { staggerChildren: 0.05 } },
};

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.97, y: 4 },
  animate: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
  exit: {
    opacity: 0, scale: 0.97, y: 4,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

export const toastVariants: Variants = {
  initial: { opacity: 0, x: 40, scale: 0.96 },
  animate: { opacity: 1, x: 0,  scale: 1, transition: { type: "spring", stiffness: 300, damping: 26 } },
  exit:    { opacity: 0, x: 40, scale: 0.96, transition: { duration: 0.18 } },
};

export const slideDownVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto", transition: { duration: 0.2 } },
  exit:    { opacity: 0, height: 0,     transition: { duration: 0.15 } },
};
