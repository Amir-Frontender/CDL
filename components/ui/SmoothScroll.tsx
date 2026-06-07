"use client";

import { useEffect } from "react";
import Lenis from "lenis";

function getHashTarget(hash: string) {
  if (!hash) return null;
  return document.getElementById(decodeURIComponent(hash.slice(1)));
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      const isSamePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
      const section = getHashTarget(url.hash);

      if (!isSamePage || !section) return;

      event.preventDefault();
      window.history.pushState(null, "", url.hash);
      lenis.scrollTo(section, {
        duration: 1.2,
        easing: (value) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
      });
    };

    const resizeLenis = () => lenis.resize();

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("cdl:layout-shift", resizeLenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("cdl:layout-shift", resizeLenis);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
