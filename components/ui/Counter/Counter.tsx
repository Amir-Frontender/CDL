"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type CounterProps = {
  value: number;
  suffix: string;
};

export function Counter({ value, suffix }: CounterProps) {
  const [count, setCount] = useState(value);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (hasAnimated.current || prefersReducedMotion) {
          setCount(value);
          return;
        }

        hasAnimated.current = true;
        const duration = 1300;
        const start = performance.now();
        const tick = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}
