"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function GoldProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 999,
        originX: 0,
        background: "linear-gradient(90deg, #c9a84c, #f5e0a0, #c9a84c)",
      }}
    />
  );
}
