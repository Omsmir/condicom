"use client";
import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const MotionComponent: React.FC<Props> = ({ children, className = "" }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, staggerChildren: 0.3 } },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={className}
    >
      <motion.div variants={variants}>{children}</motion.div>
    </motion.section>
  );
};

