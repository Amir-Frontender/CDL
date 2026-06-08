"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Messages } from "@/lib/i18n";
import styles from "./LuxuryCursor.module.css";

type CursorMode = "idle" | "interactive" | "media";

type LuxuryCursorProps = {
  labels: Messages["cursor"];
};

const interactiveSelector =
  'a, button, [role="button"], [data-cursor], [data-cursor-label], .swiper, [class*="swiper"]';

function getCursorMode(element: HTMLElement | null): CursorMode {
  if (!element) return "idle";

  const cursorType = element.dataset.cursor;
  if (cursorType === "media" || cursorType === "card" || cursorType === "drag") {
    return "media";
  }

  if (element.closest("[data-cursor='media'], [data-cursor='card'], [data-cursor='drag']")) {
    return "media";
  }

  return "interactive";
}

export function LuxuryCursor({ labels }: LuxuryCursorProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const smoothX = useSpring(x, { stiffness: 300, damping: 34, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 34, mass: 0.45 });
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("idle");
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const modeRef = useRef<CursorMode>("idle");
  const labelRef = useRef("");

  const diameter = mode === "media" ? 68 : mode === "interactive" ? 52 : 28;
  const left = useTransform(smoothX, (value) => value - diameter / 2);
  const top = useTransform(smoothY, (value) => value - diameter / 2);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncAvailability() {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    }

    syncAvailability();
    finePointer.addEventListener("change", syncAvailability);
    reducedMotion.addEventListener("change", syncAvailability);

    return () => {
      finePointer.removeEventListener("change", syncAvailability);
      reducedMotion.removeEventListener("change", syncAvailability);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("luxury-cursor-enabled");

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest(interactiveSelector) as HTMLElement | null;
      const cursorMode = getCursorMode(element);
      const cursorLabel = element?.dataset.cursorLabel ?? (element?.dataset.cursor === "drag" ? labels.drag : "");

      if (modeRef.current !== cursorMode) {
        modeRef.current = cursorMode;
        setMode(cursorMode);
      }

      if (labelRef.current !== cursorLabel) {
        labelRef.current = cursorLabel;
        setLabel(cursorLabel);
      }
    }

    function handlePointerDown() {
      setPressed(true);
    }

    function handlePointerUp() {
      setPressed(false);
    }

    function handlePointerLeave() {
      x.set(-120);
      y.set(-120);
      modeRef.current = "idle";
      labelRef.current = "";
      setMode("idle");
      setLabel("");
      setPressed(false);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      document.body.classList.remove("luxury-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [enabled, labels.drag, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={[styles.cursor, styles[mode]].join(" ")}
      style={{ x: left, y: top, width: diameter, height: diameter }}
      animate={{ opacity: 1, scale: pressed ? 0.86 : 1 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
    </motion.div>
  );
}
