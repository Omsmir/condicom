"use client"
import { motion } from "framer-motion";
import React from "react";

interface Props {
    children:React.ReactNode
}
export const MotionComponent:React.FC<Props> = ({ children }) => {
  const visible = { opacity: 1, scale: 1, transition: { duration: 0.6 } };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible,
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

