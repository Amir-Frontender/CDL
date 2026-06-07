"use client";

import { ArrowUp } from "lucide-react";
import styles from "./BackToTopButton.module.css";

export function BackToTopButton({ label }: { label: string }) {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label={label}
      onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" })}
    >
      <ArrowUp size={18} />
      <span>{label}</span>
    </button>
  );
}
