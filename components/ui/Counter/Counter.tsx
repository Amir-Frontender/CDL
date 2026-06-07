"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type CounterProps = {
  value: number;
  suffix: string;
};

export function Counter({ value, suffix }: CounterProps) {
  const [count, setCount] = useState(value);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        setCount(value);
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}
