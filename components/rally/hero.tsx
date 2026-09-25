import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { ScrollLink } from "../scroll-link";
import { formatEventDate, text } from "../helpers";
import { launchStatement } from "./content";
import { RallyWordmark } from "./logo";

/**
 * The court photo with its tree canopy extended outward and downward
 * (generated from the original's own foliage), so the forest carries past
 * the hero and fades into the deep green of the next section.
 * The original 736 × 1075 frame sits top-center of this 2200 × 1700 canvas.
 */
const HERO_PHOTO = {
  src: "/images/hero-court-extended.jpg",
  width: 2200,
  height: 1700,
  originalHeight: 1075,
};

type RallyHeroProps = {
  event: PublicEventData["event"];
  showCta: boolean;
};

function ordinalDay(day: number) {
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${day}${suffix}`;
}

export function RallyHero({ event, showCta }: RallyHeroProps) {
  const { content, display_settings: ds } = event;
  const brand = text(content.companyName, "RALLY");

  const tz = event.timezone;
  const month = formatEventDate(event.start_date, tz, { month: "short" });
  const day = formatEventDate(event.start_date, tz, { day: "numeric" });
  const shortDate = formatEventDate(event.start_date, tz, {
    month: "2-digit",
    day: "2-digit",
  })?.replace("/", ".");
  const clock = (d: string | null) =>
    formatEventDate(d, tz, { hour: "numeric", minute: "2-digit" })
      ?.replace(":00", "")
      .replace(" ", "")
      .toLowerCase();
  const start = clock(event.start_date);
  const end = clock(event.end_date);

  const [venueName, ...placeParts] = (event.location ?? "").split(",");
  const place = placeParts
    .join(",")
    .trim()
    .replace(/, California$/, ", CA");

  const showDate = ds.displayDate ?? true;
  const showTime = ds.displayTime ?? true;
  const showLocation = ds.displayLocation ?? true;

  return (
    <div className="relative isolate -mt-18 overflow-hidden bg-deep text-(--event-base-bg)">
      <Image
        src={HERO_PHOTO.src}
        alt="Aerial view of a clay tennis court surrounded by trees"
        width={HERO_PHOTO.width}
        height={HERO_PHOTO.height}
        priority
        sizes="200vw"
        className="absolute top-0 left-1/2 -z-20 w-auto max-w-none -translate-x-1/2"
        style={{
          height: `calc(max(100svh, 640px) * ${HERO_PHOTO.height / HERO_PHOTO.originalHeight})`,
        }}
      />
      {/* Legibility veils: top for the nav, and a light overall wash */}
      <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-linear-to-b from-deep/80 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-deep/15" />

      {/* ---------- Poster ---------- */}
      <section
        id="hero"
        className="mx-auto flex min-h-[max(100svh,640px)] max-w-7xl flex-col px-4 pt-24 pb-8 sm:px-8 md:pt-28"
      >
        {/* Masthead */}
        <div className="rally-hero-in flex flex-col items-center text-center">
          <RallyWordmark label={brand} className="text-2xl md:text-3xl" />
          <p className="mt-2 text-[10px] font-semibold tracking-[0.5em] uppercase opacity-80">
            Presents
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between text-xs font-semibold tracking-[0.25em] text-(--event-accent-bg) uppercase sm:text-sm md:mt-8">
          <span>
            {showDate && month && day
              ? `${month} ${ordinalDay(Number(day))}`
              : ""}
          </span>
          <span>{showLocation ? place.split(",")[0] : ""}</span>
        </div>

        <h1 className="rally-hero-in mt-8 text-center font-script text-[clamp(3.25rem,10.5vw,9.5rem)] leading-[1.05] font-normal text-(--event-accent-bg) drop-shadow-[0_6px_30px_rgba(18,20,17,0.45)] md:mt-10">
          {event.name}
        </h1>

        {/* The court lives here */}
        <div className="flex-1" />

        {/* Tagline */}
        <p className="self-center text-center text-[clamp(1.6rem,4.4vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.01em] text-(--event-accent-bg) uppercase drop-shadow-[0_4px_20px_rgba(18,20,17,0.6)] md:self-end md:text-right">
          Game, set, match&hellip;
          <br />
          Hydration, served.
        </p>

        {/* Details */}
        <div className="mt-8 grid gap-6 border-t border-(--event-base-bg)/25 pt-6 sm:grid-cols-2 sm:items-end">
          <div>
            {showLocation && venueName ? (
              <p className="text-sm leading-snug font-semibold tracking-[0.12em] uppercase sm:text-base">
                {venueName.trim()}
                {place ? (
                  <>
                    <br />
                    {place}
                  </>
                ) : null}
              </p>
            ) : null}
            {(showDate && shortDate) || (showTime && start) ? (
              <p className="mt-2 text-xs tracking-[0.15em] opacity-80">
                {showDate ? shortDate : null}
                {showDate && showTime && start ? (
                  <span className="mx-2 opacity-60">|</span>
                ) : null}
                {showTime && start ? `${start} – ${end}` : null}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3 sm:justify-end">
            {showCta ? (
              <ScrollLink
                href="#register"
                className="inline-flex min-h-12 items-center rounded-full bg-(--event-accent-bg) px-7 text-xs font-semibold tracking-[0.2em] text-deep uppercase transition hover:bg-(--event-base-bg)"
              >
                {text(ds.buttonLinks?.heroCTA.text, "Join the Club")}
              </ScrollLink>
            ) : null}
            <ScrollLink
              href="#rally"
              className="inline-flex min-h-12 items-center rounded-full border border-(--event-base-bg)/60 px-7 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm transition hover:bg-(--event-base-bg) hover:text-deep"
            >
              Discover {brand}
            </ScrollLink>
          </div>
        </div>
      </section>

      {/* ---------- Statement band — the canopy fades to solid green just below the CTAs ---------- */}
      <section className="relative px-4 pt-36 pb-32 sm:px-8 md:pt-48 md:pb-44">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent,var(--color-deep)_7rem)]" />
        <div className="mx-auto max-w-7xl">
          <p className="max-w-5xl text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.12] font-medium tracking-[-0.03em]">
            {launchStatement.headline}
          </p>

          <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12 lg:items-end">
            <p className="max-w-sm text-lg leading-relaxed font-light text-(--event-base-bg)/80 lg:col-span-4">
              {launchStatement.body}
            </p>

            <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:col-start-6">
              <div className="relative aspect-[1/1.03] overflow-hidden rounded-2xl">
                <Image
                  src="/images/club-clay-court-balls.jpg"
                  alt="Tennis balls scattered across a clay court beneath the palms"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[1/1.03] overflow-hidden rounded-2xl">
                <Image
                  src="/images/club-umbrella-court.jpg"
                  alt="A player beside a green umbrella and a Tennis Club chair"
                  fill
                  sizes="(min-width: 1024px) 28vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
