"use client";

import { useEffect, useRef } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  angle: number;
  /** Frame at which the ball is released from above the footer. */
  dropAt: number;
};

const GRAVITY = 0.42;
const BOUNCE = 0.42;
const FRICTION = 0.985;
const PUSH_RADIUS = 70;

/**
 * Tennis balls that tumble into the footer when it scrolls into view, pile
 * up on the floor and scatter away from the cursor. Pure canvas, no deps.
 * With reduced motion the balls are shown already settled and stay still.
 */
export function BallPit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let balls: Ball[] = [];
    let frame = 0;
    let tick = 0;
    let running = false;
    let started = false;
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0 };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      const small = width < 640;
      const count = Math.round(Math.min(56, Math.max(18, width / 30)));
      balls = Array.from({ length: count }, (_, i) => {
        const r = small ? 14 + Math.random() * 6 : 20 + Math.random() * 10;
        return {
          x: r + Math.random() * (width - 2 * r),
          y: -r - Math.random() * 60,
          vx: (Math.random() - 0.5) * 3,
          vy: 0,
          r,
          angle: Math.random() * Math.PI * 2,
          dropAt: i * 4,
        };
      });
      tick = 0;
    };

    const step = () => {
      tick++;
      for (const b of balls) {
        if (tick < b.dropAt) continue;
        b.vy += GRAVITY;
        b.vx *= 0.995;
        // Cursor shove
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < PUSH_RADIUS + b.r && dist > 0.01) {
          const f = (PUSH_RADIUS + b.r - dist) / (PUSH_RADIUS + b.r);
          b.vx += (dx / dist) * f * 4 + pointer.vx * 0.15;
          b.vy += (dy / dist) * f * 4 + pointer.vy * 0.15;
        }
        b.x += b.vx;
        b.y += b.vy;
        b.angle += b.vx / b.r;
        // Floor and walls
        if (b.y > height - b.r) {
          b.y = height - b.r;
          b.vy *= -BOUNCE;
          b.vx *= FRICTION;
          if (Math.abs(b.vy) < 0.6) b.vy = 0;
        }
        if (b.x < b.r) {
          b.x = b.r;
          b.vx *= -BOUNCE;
        } else if (b.x > width - b.r) {
          b.x = width - b.r;
          b.vx *= -BOUNCE;
        }
      }
      // Ball-to-ball contacts
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];
        if (tick < a.dropAt) continue;
        for (let j = i + 1; j < balls.length; j++) {
          const c = balls[j];
          if (tick < c.dropAt) continue;
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const min = a.r + c.r;
          const d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const nx = dx / d;
          const ny = dy / d;
          const overlap = (min - d) / 2;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          c.x += nx * overlap;
          c.y += ny * overlap;
          const rel = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
          if (rel < 0) {
            const impulse = (-(1 + BOUNCE) * rel) / 2;
            a.vx -= impulse * nx;
            a.vy -= impulse * ny;
            c.vx += impulse * nx;
            c.vy += impulse * ny;
          }
        }
      }
      pointer.vx *= 0.8;
      pointer.vy *= 0.8;
    };

    const drawBall = (b: Ball) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);
      const g = ctx.createRadialGradient(
        -b.r * 0.35,
        -b.r * 0.35,
        b.r * 0.1,
        0,
        0,
        b.r,
      );
      g.addColorStop(0, "#f2ea8a");
      g.addColorStop(0.65, "#e6d25c");
      g.addColorStop(1, "#b9a53a");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(251,248,240,0.9)";
      ctx.lineWidth = Math.max(1.5, b.r * 0.09);
      ctx.lineCap = "round";
      const k = b.r * 0.7;
      ctx.beginPath();
      ctx.moveTo(-k, -k);
      ctx.bezierCurveTo(-k * 0.3, -k * 0.3, -k * 0.3, k * 0.3, -k, k);
      ctx.moveTo(k, -k);
      ctx.bezierCurveTo(k * 0.3, -k * 0.3, k * 0.3, k * 0.3, k, k);
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const b of balls) if (tick >= b.dropAt) drawBall(b);
    };

    // Fixed 60 Hz physics so 120 Hz screens don't fall twice as fast
    const STEP_MS = 1000 / 60;
    let last = 0;
    let carry = 0;
    const loop = (now: number) => {
      carry += Math.min(100, last ? now - last : STEP_MS);
      last = now;
      while (carry >= STEP_MS) {
        step();
        carry -= STEP_MS;
      }
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!started) {
        started = true;
        spawn();
        if (reduced) {
          for (let i = 0; i < 900; i++) step();
          draw();
          return;
        }
      }
      if (!reduced && !running) {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      last = 0;
      cancelAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (pointer.x > -9000) {
        pointer.vx = x - pointer.x;
        pointer.vy = y - pointer.y;
      }
      pointer.x = x;
      pointer.y = y;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    size();
    const resize = new ResizeObserver(() => {
      size();
      if (reduced && started) draw();
    });
    resize.observe(host);
    const seen = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.2 },
    );
    seen.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      resize.disconnect();
      seen.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
