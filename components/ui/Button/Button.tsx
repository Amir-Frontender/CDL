import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
