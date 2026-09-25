import { useId } from "react";

import { cn } from "@/lib/utils";

import type { CanTone } from "./content";
import { RallyWordmarkSvg } from "./logo";

/* ---------------------------------------------- */
/* Slim can                                        */
/* ---------------------------------------------- */

const CAN_TONES: Record<
  CanTone,
  { body: string; shade: string; ink: string; band: string }
> = {
  cream: { body: "#f6eedb", shade: "#d9ccae", ink: "#202b19", band: "#202b19" },
  citrus: {
    body: "#e6d25c",
    shade: "#c2ac38",
    ink: "#202b19",
    band: "#fbf8f0",
  },
  forest: {
    body: "#2c3b23",
    shade: "#141c0f",
    ink: "#f4e7c5",
    band: "#e6d25c",
  },
  clay: { body: "#bd4325", shade: "#932f16", ink: "#fbf8f0", band: "#f4e7c5" },
};

type SlimCanProps = {
  tone: CanTone;
  variant: string;
  className?: string;
  /** Position/size when nested inside another SVG scene. */
  frame?: { x: number; y: number; width: number; height: number };
};

export function SlimCan({ tone, variant, className, frame }: SlimCanProps) {
  const id = useId();
  const c = CAN_TONES[tone];

  return (
    <svg
      viewBox="0 0 120 400"
      {...frame}
      className={
        frame
          ? className
          : cn("drop-shadow-[0_30px_30px_rgba(18,20,17,0.28)]", className)
      }
      role="img"
      aria-label={`RALLY ${variant} can`}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" x2="1">
          <stop offset="0" stopColor={c.shade} />
          <stop offset="0.22" stopColor={c.body} />
          <stop offset="0.78" stopColor={c.body} />
          <stop offset="1" stopColor={c.shade} />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="0" x2="1">
          <stop offset="0" stopColor="#8d918a" />
          <stop offset="0.45" stopColor="#e9ebe6" />
          <stop offset="0.6" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8d918a" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" x2="1">
          <stop offset="0.52" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.62" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="0.72" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x="10" y="26" width="100" height="360" rx="10" />
        </clipPath>
      </defs>

      {/* Lid + neck */}
      <path
        d="M22 10 h76 q6 0 8 8 l4 12 H10 l4 -12 q2 -8 8 -8z"
        fill={`url(#${id}-metal)`}
      />
      <rect
        x="10"
        y="26"
        width="100"
        height="360"
        rx="10"
        fill={`url(#${id}-body)`}
      />
      <rect
        x="10"
        y="26"
        width="100"
        height="360"
        rx="10"
        fill={`url(#${id}-shine)`}
      />

      <g clipPath={`url(#${id}-clip)`}>
        {/* Condensation beads */}
        {[
          [28, 70],
          [88, 96],
          [40, 150],
          [80, 220],
          [30, 262],
          [92, 300],
          [52, 330],
          [70, 60],
        ].map(([cx, cy], i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={i % 2 ? 2.2 : 1.6}
            ry={i % 2 ? 3 : 2.2}
            fill="#ffffff"
            opacity="0.55"
          />
        ))}

        <rect
          x="10"
          y="304"
          width="100"
          height="10"
          fill={c.band}
          opacity="0.9"
        />
        <rect
          x="10"
          y="318"
          width="100"
          height="2"
          fill={c.band}
          opacity="0.9"
        />

        <text
          x="60"
          y="92"
          textAnchor="middle"
          fill={c.ink}
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: 9,
            letterSpacing: 3,
            fontWeight: 600,
          }}
        >
          SPARKLING
        </text>
        <RallyWordmarkSvg
          x={0}
          y={0}
          size={36}
          fill={c.ink}
          transform="translate(72 190) rotate(-90)"
        />
        <text
          x="60"
          y="292"
          textAnchor="middle"
          fill={c.ink}
          style={{
            fontFamily: "var(--font-script-face)",
            fontSize: 23,
          }}
        >
          {variant}
        </text>
        <text
          x="60"
          y="350"
          textAnchor="middle"
          fill={c.ink}
          opacity="0.75"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: 7,
            letterSpacing: 2,
          }}
        >
          12 FL OZ · 355 ML
        </text>
      </g>

      <path
        d="M10 376 q0 10 10 10 h80 q10 0 10 -10 v4 q0 12 -12 12 H22 q-12 0 -12 -12z"
        fill={c.shade}
      />
    </svg>
  );
}

/** Standard intro copy that sits under a section title. */
export const SECTION_DESCRIPTION =
  "text-lg leading-relaxed text-(--event-base-bg)/75";

/** One headline style for every section title on the page. */
export const SECTION_TITLE =
  "text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.95] font-medium tracking-[-0.035em]";

/* ---------------------------------------------- */
/* Section eyebrow — a short rule and a label      */
/* ---------------------------------------------- */

export function Eyebrow({
  label,
  className,
  as: Tag = "p",
}: {
  label: string;
  className?: string;
  /** Render as a heading when the label titles a block of content. */
  as?: "p" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium tracking-[0.28em] text-(--event-accent-bg) uppercase",
        className,
      )}
    >
      <span className="h-px w-8 shrink-0 bg-current opacity-50" />
      {label}
    </Tag>
  );
}
