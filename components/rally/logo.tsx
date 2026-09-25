import { cn } from "@/lib/utils";

/**
 * The RALLY wordmark — Cormorant Garamond in open, tracked capitals.
 * Size it with a text-* class; the trailing tracking is trimmed so the
 * word stays optically centered.
 */
export function RallyWordmark({
  className,
  label = "RALLY",
  decorative = false,
}: {
  className?: string;
  label?: string;
  decorative?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-block font-serif leading-none font-medium tracking-[0.28em] uppercase [margin-right:-0.28em]",
        className,
      )}
      aria-hidden={decorative || undefined}
    >
      {label}
    </span>
  );
}

/** The same wordmark as SVG text, for artwork such as the can labels. */
export function RallyWordmarkSvg({
  x,
  y,
  size,
  fill,
  transform,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
  transform?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      transform={transform}
      fill={fill}
      style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "0.2em",
      }}
    >
      RALLY
    </text>
  );
}
