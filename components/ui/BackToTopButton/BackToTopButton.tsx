"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./BackToTopButton.module.css";

export function BackToTopButton({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > window.innerHeight);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <button
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      type="button"
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" })}
    >
      <ArrowUp size={18} />
      <span>{label}</span>
    </button>
  );
}
