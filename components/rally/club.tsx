import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { ordered } from "../helpers";
import { Markdown } from "../markdown";
import { experiences, hostPhotos } from "./content";
import { Eyebrow, SECTION_DESCRIPTION, SECTION_TITLE } from "./graphics";

export function RallyExperiences() {
  return (
    <section
      id="experiences"
      className="scroll-mt-20 px-4 py-24 text-(--event-base-bg) sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow label="The Experiences" />
            <h2 className={`mt-6 ${SECTION_TITLE}`}>
              Move. Hydrate.
              <br />
              <em className="font-accent font-normal tracking-[-0.02em] italic">
                Recover. Gather.
              </em>
            </h2>
          </div>
          <p className={`max-w-sm ${SECTION_DESCRIPTION}`}>
            Eight club moments, each designed around a different part of the
            active day.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((x, i) => (
            <li
              key={x.name}
              className="rally-swing group relative flex flex-col rounded-t-[40px] rounded-b-md bg-(--event-base-bg) px-6 pt-12 text-deep pb-6 transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* Locker-tag punch hole */}
              <span className="absolute top-5 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-deep ring-2 ring-deep/30" />
              <p className="flex items-center justify-between text-[11px] font-semibold tracking-[0.3em] text-deep uppercase">
                <span>Locker</span>
                <span className="font-script text-xl tracking-normal">
                  No. {String(i + 1).padStart(2, "0")}
                </span>
              </p>
              <div className="relative my-5 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={x.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: x.imagePosition }}
                />
              </div>
              <h3 className="text-2xl leading-tight font-medium tracking-tight uppercase">
                {x.name}
              </h3>
              <p className="mt-auto pt-6 text-sm leading-relaxed text-(--event-base-text)/70">
                {x.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type RallyGuestsProps = {
  event: PublicEventData["event"];
  speakers: PublicEventData["speakers"];
};

const MONOGRAM_TONES = [
  "bg-(--event-base-bg) text-deep",
  "bg-citrus text-deep",
  "bg-clay text-(--event-base-bg)",
  "bg-(--event-accent-bg) text-deep",
];

export function RallyGuests({ event, speakers }: RallyGuestsProps) {
  const { content } = event;

  return (
    <section
      id="speakers"
      className="scroll-mt-20 px-4 py-24 text-(--event-base-bg) sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Eyebrow label="On court" className="justify-center" />
          <h2 className={`mt-6 ${SECTION_TITLE}`}>
            Your{" "}
            <em className="font-accent font-normal tracking-[-0.02em] italic">
              Hosts
            </em>
          </h2>
          {content.speakersDescription ? (
            <Markdown
              className={`mx-auto mt-5 max-w-md ${SECTION_DESCRIPTION}`}
            >
              {content.speakersDescription}
            </Markdown>
          ) : null}
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {ordered(speakers).map((s, i) => (
            <li
              key={s.id}
              className="rally-reveal flex flex-col items-center text-center"
            >
              <div className="relative aspect-[4/5] w-full max-w-72 overflow-hidden rounded-2xl">
                {s.image_url || hostPhotos[s.name] ? (
                  <Image
                    src={s.image_url || hostPhotos[s.name].src}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 80vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    style={{
                      objectPosition: s.image_url
                        ? undefined
                        : hostPhotos[s.name].position,
                    }}
                  />
                ) : (
                  <div
                    className={`relative flex size-full items-center justify-center ${MONOGRAM_TONES[i % MONOGRAM_TONES.length]}`}
                    aria-hidden="true"
                  >
                    <span className="font-script text-7xl">
                      {s.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-tight">
                {s.name}
              </h3>
              {s.title ? (
                <p className="mt-1 font-accent text-base text-(--event-accent-bg) italic">
                  {s.title}
                </p>
              ) : null}
              {s.bio ? (
                <p className="mt-3 max-w-64 text-sm leading-relaxed text-(--event-base-bg)/65">
                  {s.bio}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
