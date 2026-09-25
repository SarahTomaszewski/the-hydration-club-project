"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * A slow, endless strip of slides bent into a shallow concave curve: cards
 * at the edges swing toward the viewer and grow, the middle card sits back.
 * Pauses on hover; holds still (and becomes swipeable) with reduced motion.
 */
export function CurvedCarousel({
  slides,
  speed = 0.35,
}: {
  slides: { key: string; label: string; node: ReactNode }[];
  /** Pixels per frame at 60fps. */
  speed?: number;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = Array.from(tr.children) as HTMLElement[];
    let offset = 0;
    let paused = false;
    let last = performance.now();
    let frame = 0;

    const bend = () => {
      const box = vp.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;
      const mid = box.left + box.width / 2;
      const half = box.width / 2;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const d = Math.max(
          -1.4,
          Math.min(1.4, (r.left + r.width / 2 - mid) / half),
        );
        el.style.transform = `perspective(1400px) rotateY(${-d * 26}deg) scale(${1 + Math.abs(d) * 0.12})`;
        el.style.zIndex = String(Math.round(Math.abs(d) * 10));
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!paused && !reduced) {
        // The slide list is rendered three times so short lists still
        // overflow the viewport; wrap after one full set.
        const loop = tr.scrollWidth / 3;
        offset = (offset + speed * (dt / 16.67)) % loop;
        tr.style.translate = `${-offset}px 0`;
      }
      bend();
      frame = requestAnimationFrame(tick);
    };

    const pause = () => (paused = true);
    const resume = () => (paused = false);
    vp.addEventListener("pointerenter", pause);
    vp.addEventListener("pointerleave", resume);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      vp.removeEventListener("pointerenter", pause);
      vp.removeEventListener("pointerleave", resume);
    };
  }, [speed]);

  const renderSet = (copy: number) =>
    slides.map((slide) => (
      <li
        key={`${copy}-${slide.key}`}
        aria-hidden={copy > 0 || undefined}
        className="relative aspect-[3/4] w-[62vw] shrink-0 overflow-hidden rounded-[28px] will-change-transform sm:w-[34vw] lg:w-[21vw]"
      >
        {slide.node}
        <span className="sr-only">{slide.label}</span>
      </li>
    ));

  return (
    <div
      ref={viewport}
      className="overflow-hidden py-10 motion-reduce:overflow-x-auto"
      role="region"
      aria-roledescription="carousel"
      aria-label="Scenes from The Hydration Club"
    >
      <ul ref={track} className="flex w-max gap-5 px-4 will-change-transform">
        {renderSet(0)}
        {renderSet(1)}
        {renderSet(2)}
      </ul>
    </div>
  );
}
