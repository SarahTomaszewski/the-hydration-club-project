import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { formatEventDate, text } from "../helpers";
import { Markdown } from "../markdown";
import { quote } from "./content";
import { CurvedCarousel } from "./curved-carousel";
import { PageTint } from "./page-tint";
import { Eyebrow, SECTION_DESCRIPTION, SECTION_TITLE } from "./graphics";

type RallyScheduleProps = {
  event: PublicEventData["event"];
  sessions: PublicEventData["sessions"];
  speakers: PublicEventData["speakers"];
};

export function RallySchedule({
  event,
  sessions,
  speakers,
}: RallyScheduleProps) {
  const { content } = event;
  const speakerName = new Map(speakers.map((s) => [s.id, s.name]));
  const sorted = [...sessions].sort((a, b) =>
    (a.start_time ?? "").localeCompare(b.start_time ?? ""),
  );

  return (
    <section
      id="agenda"
      className="scroll-mt-20 px-4 py-24 text-(--event-base-bg) sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow label="The Day" />
            <h2 className={`mt-6 ${SECTION_TITLE}`}>
              {/* Last word set in the Libre Baskerville accent */}
              {(() => {
                const words = text(content.agendaTitle, "The Schedule").split(
                  " ",
                );
                const last = words.pop();
                return (
                  <>
                    {words.join(" ")}{" "}
                    <em className="font-accent font-normal tracking-[-0.02em] italic">
                      {last}
                    </em>
                  </>
                );
              })()}
            </h2>
          </div>
          {content.agendaDescription ? (
            <Markdown
              className={`max-w-sm md:col-span-5 md:justify-self-end ${SECTION_DESCRIPTION}`}
            >
              {content.agendaDescription}
            </Markdown>
          ) : null}
        </div>

        <ol className="mt-14 border-b border-(--event-base-bg)/20">
          {sorted.map((session) => {
            const [clock, meridiem] = (
              formatEventDate(session.start_time, event.timezone, {
                hour: "numeric",
                minute: "2-digit",
              }) ?? ""
            ).split(" ");
            const hosts = session.speakers
              .map((s) => speakerName.get(s.speaker_id))
              .filter(Boolean);

            return (
              <li
                key={session.id}
                className="rally-reveal group grid gap-3 border-t border-(--event-base-bg)/20 py-7 transition-colors hover:bg-(--event-base-bg)/5 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4"
              >
                <p className="whitespace-nowrap text-(--event-accent-bg) md:col-span-3 xl:col-span-2">
                  <span className="text-4xl font-medium tracking-tight tabular-nums md:text-5xl">
                    {clock}
                  </span>
                  <span className="ml-1.5 text-xs font-semibold tracking-[0.2em]">
                    {meridiem}
                  </span>
                </p>
                <h3 className="font-accent text-2xl leading-snug italic md:col-span-4 md:text-3xl">
                  {session.name}
                </h3>
                <div className="text-(--event-base-bg)/75 md:col-span-3 xl:col-span-4">
                  {session.description ? (
                    <Markdown>{session.description}</Markdown>
                  ) : null}
                  {hosts.length ? (
                    <p className="mt-2 text-sm text-(--event-accent-bg)">
                      With {hosts.join(" & ")}
                    </p>
                  ) : null}
                </div>
                {session.location ? (
                  <p className="md:col-span-2 md:text-right">
                    <span className="inline-block rounded-full border border-(--event-base-bg)/40 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-(--event-base-bg) uppercase">
                      {session.location}
                    </span>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Scenes for the carousel. Add more photos here as they come in. */
const SCENES = [
  {
    src: "/images/scenes/hedge-lounge.jpg",
    label: "Lounge chairs beneath the hedge arches",
  },
  {
    src: "/images/scenes/clay-motion.jpg",
    label: "A player in motion on the clay",
  },
  {
    src: "/images/scenes/umbrella-crew.jpg",
    label: "Friends in tennis whites under a courtside umbrella",
  },
  {
    src: "/images/scenes/net-table.jpg",
    label: "A long table set along the net with tennis-ball centerpieces",
  },
];

const slides = SCENES.map((scene) => ({
  key: scene.src,
  label: scene.label,
  node: (
    <Image
      src={scene.src}
      alt=""
      fill
      sizes="(min-width: 1024px) 22vw, 60vw"
      className="object-cover"
    />
  ),
}));

/** Terracotta band — a curved, drifting carousel of scenes over an oversized quote. */
export function RallyQuoteBand({
  founder,
}: {
  founder?: { name: string; title: string | null };
}) {
  return (
    <section
      id="scenes"
      className="overflow-hidden py-10 text-(--event-base-bg) md:py-14"
    >
      <PageTint targetId="scenes" />
      <CurvedCarousel slides={slides} />
      <figure className="rally-reveal mx-auto max-w-5xl px-4 py-16 text-center sm:px-8 md:py-24">
        <blockquote className="text-[clamp(1.6rem,3.8vw,3.4rem)] leading-[1.05] font-medium tracking-[-0.01em] uppercase">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {founder ? (
          <figcaption className="mt-8 text-xs font-semibold tracking-[0.3em] uppercase">
            {founder.name}
            {founder.title ? ` — ${founder.title}` : ""}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
