import Image from "next/image";

import type { HappilyEnv, PublicEventData } from "@/lib/happily/types";

import { FaqList } from "../faq-list";
import { eventDateRange, ordered, text } from "../helpers";
import { Markdown } from "../markdown";
import { RegistrationForm } from "../registration-form";
import { menu, type MenuItem, venue } from "./content";
import { Eyebrow, SECTION_DESCRIPTION, SECTION_TITLE } from "./graphics";
import { RallyWordmark } from "./logo";

/* ---------------------------------------------- */
/* Food & beverage — the menu drawn as a court     */
/* ---------------------------------------------- */

const LINE = "border-(--event-base-bg)/55";

/** One row of the court: doubles alley · singles court · doubles alley. */
function CourtRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="grid grid-cols-[1rem_1fr_1rem] sm:grid-cols-[2.5rem_1fr_2.5rem] lg:grid-cols-[4.5rem_1fr_4.5rem]">
      <div className={`border-r ${LINE}`} />
      <div className={`min-w-0 ${className ?? ""}`}>{children}</div>
      <div className={`border-l ${LINE}`} />
    </div>
  );
}

function MenuBox({
  title,
  items,
  className,
}: {
  title: string;
  items: MenuItem[];
  className?: string;
}) {
  return (
    <div className={`px-5 py-8 sm:px-8 md:py-10 ${className ?? ""}`}>
      <h3 className="font-script text-4xl leading-none text-(--event-accent-bg) md:text-5xl">
        {title}
      </h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.name}>
            <p className="text-sm font-semibold tracking-[0.04em]">
              {item.name}
            </p>
            <p className="font-accent text-sm text-(--event-base-bg)/70 italic">
              {item.note}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RallyMenu() {
  const [a, b, c, d] = menu.boxes;

  return (
    <section
      id="menu"
      className="scroll-mt-20 px-4 py-24 text-(--event-base-bg) sm:px-8 md:py-32"
    >
      <div className="mx-auto mb-14 grid max-w-6xl gap-8 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow label="Food & Beverage" />
          <h2 className={`mt-6 ${SECTION_TITLE}`}>
            Fresh from the{" "}
            <em className="font-accent font-normal tracking-[-0.02em] italic">
              court
            </em>
          </h2>
        </div>
        <p className={`max-w-md md:col-span-5 ${SECTION_DESCRIPTION}`}>
          {menu.intro}
        </p>
      </div>

      <div className={`mx-auto max-w-6xl border-2 ${LINE}`}>
        {/* Back court — the menu's masthead */}
        <CourtRow className="flex justify-center px-4 py-14 md:py-20">
          <div
            className="flex w-full max-w-sm items-center justify-center rounded-[50%] border-2 border-(--event-accent-bg)/80 px-6 py-4 sm:py-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(244,231,197,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(244,231,197,0.12) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            <h3 className="font-script text-6xl leading-[1.15] text-(--event-accent-bg) sm:text-7xl md:text-8xl">
              Menu
            </h3>
          </div>
        </CourtRow>

        {/* Service boxes, near side */}
        <CourtRow className={`grid border-t ${LINE} md:grid-cols-2`}>
          <MenuBox
            {...a}
            className={`border-b ${LINE} md:border-r md:border-b-0`}
          />
          <MenuBox {...b} />
        </CourtRow>

        {/* The net runs the full width, alleys included */}
        <div className="relative h-3 border-y-2 border-(--event-base-bg)/80 bg-[repeating-linear-gradient(90deg,rgba(251,248,240,0.35)_0_1px,transparent_1px_7px)]">
          <span className="absolute -top-2 -left-1.5 h-6 w-1.5 bg-(--event-base-bg)" />
          <span className="absolute -top-2 -right-1.5 h-6 w-1.5 bg-(--event-base-bg)" />
        </div>

        {/* Service boxes, far side */}
        <CourtRow className="grid md:grid-cols-2">
          <MenuBox
            {...c}
            className={`border-b ${LINE} md:border-r md:border-b-0`}
          />
          <MenuBox {...d} />
        </CourtRow>

        {/* Back court — pours */}
        <CourtRow className={`border-t ${LINE}`}>
          <div className="px-5 py-10 sm:px-8 md:py-12">
            <h3 className="text-center font-script text-4xl leading-none text-(--event-accent-bg) md:text-5xl">
              {menu.backCourt.title}
            </h3>
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {menu.backCourt.items.map((item) => (
                <li key={item.name}>
                  <p className="text-sm font-semibold tracking-[0.04em]">
                    {item.name}
                  </p>
                  <p className="font-accent text-sm text-(--event-base-bg)/70 italic">
                    {item.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </CourtRow>
      </div>
    </section>
  );
}

const VENUE_PHOTOS = [
  {
    src: "/images/venue-palm-courts.jpg",
    alt: "Doubles on a court ringed by palms and mountains",
    position: "50% 50%",
  },
  {
    src: "/images/venue-court-table.jpg",
    alt: "A courtside table under a scalloped umbrella, balls and a racket on the court",
    position: "50% 60%",
  },
  {
    src: "/images/venue-courtside-lounge.jpg",
    alt: "A courtside lounge set with lemons and glassware",
    position: "50% 70%",
  },
];

/* ---------------------------------------------- */
/* Venue                                           */
/* ---------------------------------------------- */

export function RallyVenue() {
  return (
    <section
      id="venue"
      className="scroll-mt-20 py-24 text-(--event-base-bg) md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <Eyebrow label="The Venue" />
          <h2 className={`mt-6 ${SECTION_TITLE}`}>
            The{" "}
            <em className="font-accent font-normal tracking-[-0.02em] italic">
              Racquet
            </em>{" "}
            House
          </h2>
          <p className="mt-3 font-script text-3xl">{venue.city}</p>
        </div>
        <div className="max-w-lg md:col-span-6">
          <p className={SECTION_DESCRIPTION}>{venue.description}</p>
          <p className="mt-5 font-accent text-xl text-(--event-accent-bg) italic">
            Dress code: {venue.dressCode}
          </p>
        </div>
      </div>

      {/* Full-bleed strip: three photos edge to edge, split by 2px hairlines */}
      <ul className="mt-14 grid grid-cols-3 gap-[2px] md:mt-20">
        {VENUE_PHOTOS.map((photo) => (
          <li
            key={photo.src}
            className="group relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="34vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              style={{ objectPosition: photo.position }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------- */
/* Partners — understated, type-only               */
/* ---------------------------------------------- */

type RallyPartnersProps = {
  event: PublicEventData["event"];
  sponsors: PublicEventData["sponsors"];
};

export function RallyPartners({ event, sponsors }: RallyPartnersProps) {
  const { content } = event;
  const tiers = new Map<
    string,
    { order: number; names: PublicEventData["sponsors"] }
  >();
  for (const s of ordered(sponsors)) {
    const key = s.tier?.name ?? "Partners";
    const entry = tiers.get(key) ?? { order: s.tier?.order ?? 99, names: [] };
    entry.names.push(s);
    tiers.set(key, entry);
  }
  const grouped = [...tiers.entries()].sort((a, b) => a[1].order - b[1].order);

  return (
    <section
      id="sponsors"
      className="scroll-mt-20 px-4 py-24 text-(--event-base-bg) sm:px-8"
    >
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow
          label={text(content.sponsorsTitle, "Partners")}
          className="justify-center"
        />
        <h2 className={`mt-6 ${SECTION_TITLE}`}>
          In good{" "}
          <em className="font-accent font-normal tracking-[-0.02em] italic">
            company
          </em>
        </h2>
        {content.sponsorsDescription ? (
          <Markdown className={`mx-auto mt-5 max-w-md ${SECTION_DESCRIPTION}`}>
            {content.sponsorsDescription}
          </Markdown>
        ) : null}

        <div className="mt-12 divide-y divide-(--event-base-bg)/15 border-y border-(--event-base-bg)/15">
          {grouped.map(([tier, { names }], i) => (
            <div key={tier} className="py-8">
              <p className="text-[10px] font-semibold tracking-[0.35em] text-(--event-base-bg)/50 uppercase">
                {tier}
              </p>
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
                {names.map((s) => {
                  const label = /^rally$/i.test(s.name) ? (
                    <RallyWordmark label={s.name} className="text-5xl" />
                  ) : (
                    <span
                      className={
                        i === 0
                          ? "text-5xl font-semibold tracking-[-0.04em]"
                          : i === 1
                            ? "font-script text-4xl"
                            : "text-sm font-medium tracking-[0.25em] uppercase"
                      }
                    >
                      {s.name}
                    </span>
                  );
                  return (
                    <li key={s.id}>
                      {s.website ? (
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70"
                        >
                          {label}
                        </a>
                      ) : (
                        label
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- */
/* Stationery frame — double rule, scooped corners */
/* ---------------------------------------------- */

const FRAME_INSET = 14; // px from the card edge to the outer rule
const NOTCH = 22; // radius of the scooped corner
const GAP = 6; // space between the two rules
const INNER_NOTCH_RUN = Math.sqrt((NOTCH + GAP) ** 2 - GAP ** 2);

function FrameCorner({ flip }: { flip: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className="absolute size-10 text-deep"
      style={{ transform: flip }}
      aria-hidden="true"
    >
      <path
        d={`M${NOTCH} 0 A${NOTCH} ${NOTCH} 0 0 1 0 ${NOTCH}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d={`M${INNER_NOTCH_RUN} ${GAP} A${NOTCH + GAP} ${NOTCH + GAP} 0 0 1 ${GAP} ${INNER_NOTCH_RUN}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** A cream card dressed like club stationery. */
function StationeryFrame({ children }: { children: React.ReactNode }) {
  const outer = FRAME_INSET + NOTCH;
  const inner = FRAME_INSET + INNER_NOTCH_RUN;
  const i2 = FRAME_INSET + GAP;
  const rule = "absolute border-deep";
  return (
    <div className="relative bg-(--event-base-bg) text-deep shadow-[0_40px_80px_-40px_rgba(18,20,17,0.7)]">
      <div aria-hidden="true">
        {/* straight runs of the outer and inner rules */}
        <span
          className={`${rule} border-t-[1.5px]`}
          style={{ top: FRAME_INSET, left: outer, right: outer }}
        />
        <span
          className={`${rule} border-b-[1.5px]`}
          style={{ bottom: FRAME_INSET, left: outer, right: outer }}
        />
        <span
          className={`${rule} border-l-[1.5px]`}
          style={{ left: FRAME_INSET, top: outer, bottom: outer }}
        />
        <span
          className={`${rule} border-r-[1.5px]`}
          style={{ right: FRAME_INSET, top: outer, bottom: outer }}
        />
        <span
          className={`${rule} border-t-[1.5px]`}
          style={{ top: i2, left: inner, right: inner }}
        />
        <span
          className={`${rule} border-b-[1.5px]`}
          style={{ bottom: i2, left: inner, right: inner }}
        />
        <span
          className={`${rule} border-l-[1.5px]`}
          style={{ left: i2, top: inner, bottom: inner }}
        />
        <span
          className={`${rule} border-r-[1.5px]`}
          style={{ right: i2, top: inner, bottom: inner }}
        />
        {/* the four scooped corners */}
        <span
          className="absolute"
          style={{ top: FRAME_INSET, left: FRAME_INSET }}
        >
          <FrameCorner flip="none" />
        </span>
        <span
          className="absolute"
          style={{ top: FRAME_INSET, right: FRAME_INSET + 40 }}
        >
          <FrameCorner flip="scaleX(-1)" />
        </span>
        <span
          className="absolute"
          style={{ bottom: FRAME_INSET + 40, left: FRAME_INSET }}
        >
          <FrameCorner flip="scaleY(-1)" />
        </span>
        <span
          className="absolute"
          style={{ bottom: FRAME_INSET + 40, right: FRAME_INSET + 40 }}
        >
          <FrameCorner flip="scale(-1)" />
        </span>
      </div>
      <div className="relative px-8 py-14 sm:px-16 sm:py-16">{children}</div>
    </div>
  );
}

/* ---------------------------------------------- */
/* RSVP                                            */
/* ---------------------------------------------- */

type RallyRsvpProps = {
  event: PublicEventData["event"];
  form: NonNullable<PublicEventData["form"]>;
  eventId: string;
  env: HappilyEnv;
};

export function RallyRsvp({ event, form, eventId, env }: RallyRsvpProps) {
  const city = event.location?.split(",").slice(1).join(",").trim();

  return (
    <section
      id="register"
      className="relative scroll-mt-20 overflow-hidden px-4 py-24 text-(--event-primary-text) sm:px-8 md:py-32"
    >
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow label="RSVP" />
          <h2 className={`mt-6 ${SECTION_TITLE}`}>
            {text(form.form_title, "Your daily serve starts here.")
              .replace(/\.$/, "")
              .split(" ")
              .map((word, i, all) =>
                i === all.length - 1 ? (
                  <em
                    key={i}
                    className="font-accent font-normal tracking-[-0.02em] normal-case italic"
                  >
                    {word}
                  </em>
                ) : (
                  <span key={i}>{word} </span>
                ),
              )}
          </h2>
          {form.form_description ? (
            <Markdown className={`mt-8 max-w-md ${SECTION_DESCRIPTION}`}>
              {form.form_description}
            </Markdown>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <StationeryFrame>
            <div className="mb-10 text-center">
              <p className="text-[11px] font-medium tracking-[0.35em] uppercase">
                {event.name}
              </p>
              <p className="mt-3 text-xs tracking-[0.2em] text-deep/70 uppercase">
                {eventDateRange(event)}
                {city ? ` · ${city}` : ""}
              </p>
            </div>
            <div className="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:px-10 [&_button[type=submit]]:text-xs [&_button[type=submit]]:tracking-[0.25em] [&_input]:h-12 [&_input]:rounded-none [&_input]:border-0 [&_input]:border-b [&_input]:border-deep/40 [&_input]:bg-transparent [&_input]:px-0 [&_input]:shadow-none [&_[data-slot=checkbox]]:border-deep/60 [&>form>div>label]:text-[11px] [&>form>div>label]:tracking-[0.2em] [&>form>div>label]:uppercase">
              <RegistrationForm
                eventId={eventId}
                env={env}
                form={form}
                redirectTo="/confirmation"
                buttonText={form.form_button_text}
              />
            </div>
          </StationeryFrame>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------- */
/* FAQ                                             */
/* ---------------------------------------------- */

type RallyFaqProps = {
  event: PublicEventData["event"];
  faqs: PublicEventData["faqs"];
};

export function RallyFaq({ event, faqs }: RallyFaqProps) {
  const { content } = event;

  return (
    <section
      id="faq"
      className="scroll-mt-20 px-4 py-24 text-(--event-base-bg) sm:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow label="FAQ" />
          <h2 className={`mt-6 ${SECTION_TITLE}`}>
            {text(content.faqsTitle, "Good to know")}
          </h2>
          {content.faqsDescription ? (
            <Markdown className={`mt-5 ${SECTION_DESCRIPTION}`}>
              {content.faqsDescription}
            </Markdown>
          ) : null}
        </div>
        <div className="md:col-span-7 [&_[data-slot=accordion-item]]:border-(--event-base-bg)/25 [&_[data-slot=accordion-trigger]]:py-6 [&_[data-slot=accordion-trigger]]:text-lg [&_[data-slot=accordion-trigger]]:font-medium">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
