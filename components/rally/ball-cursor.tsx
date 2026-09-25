"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, summary, label, select, [role='button'], [role='combobox'], [data-slot='accordion-trigger']";

/**
 * A citrus-yellow dot that trails the pointer with a soft, eased drag and
 * swells over anything clickable. Mouse/trackpad only; with reduced motion
 * it follows the pointer exactly.
 */
export function BallCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ease = reduced ? 1 : 0.18;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      el.style.translate = `${pos.x}px ${pos.y}px`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        pos.x = target.x;
        pos.y = target.y;
        visible = true;
        el.dataset.visible = "true";
      }
      const over = (e.target as Element | null)?.closest?.(INTERACTIVE);
      el.dataset.hover = over ? "true" : "false";
    };
    const onLeave = () => {
      visible = false;
      el.dataset.visible = "false";
    };
    const onDown = () => (el.dataset.down = "true");
    const onUp = () => (el.dataset.down = "false");

    document.documentElement.classList.add("rally-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("rally-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      data-visible="false"
      className="group pointer-events-none fixed top-0 left-0 z-[100] opacity-0 data-[visible=true]:opacity-100"
    >
      <div className="size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-citrus shadow-[0_0_0_1px_rgba(32,43,25,0.25)] transition-[width,height,opacity] duration-300 ease-out group-data-[hover=true]:size-9 group-data-[hover=true]:opacity-80 group-data-[down=true]:size-2.5" />
    </div>
  );
}
