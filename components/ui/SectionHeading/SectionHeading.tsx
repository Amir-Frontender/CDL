import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, children, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? `${styles.heading} ${styles.centered}` : styles.heading}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children ? <div className={styles.copy}>{children}</div> : null}
    </div>
  );
}
