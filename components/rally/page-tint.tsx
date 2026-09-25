"use client";

import { useEffect } from "react";

/**
 * While the section with `targetId` fills the middle of the viewport, the
 * whole page background eases from dark green to clay (see `html.page-clay`
 * in globals.css), then back again as the visitor scrolls on.
 */
export function PageTint({ targetId }: { targetId: string }) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const root = document.documentElement;
    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle("page-clay", entry.isIntersecting),
      // A thin band across the middle of the screen
      { rootMargin: "-40% 0px -40% 0px" },
    );
    observer.observe(target);

    return () => {
      observer.disconnect();
      root.classList.remove("page-clay");
    };
  }, [targetId]);

  return null;
}
