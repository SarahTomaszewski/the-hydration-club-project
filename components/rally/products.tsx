import Image from "next/image";

import { benefits, products } from "./content";
import { Eyebrow, SECTION_DESCRIPTION, SECTION_TITLE } from "./graphics";
import { RallyWordmark } from "./logo";

export function RallyProducts() {
  return (
    <section
      id="rally"
      className="scroll-mt-20 overflow-hidden px-4 py-24 text-(--event-primary-text) sm:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow label="The Line" />
            <h2 className={`mt-6 ${SECTION_TITLE}`}>Meet RALLY</h2>
          </div>
          <p className={`max-w-sm ${SECTION_DESCRIPTION}`}>
            Sparkling functional hydration for people who live actively — not
            just athletes. Four slim cans, one for every part of the day.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <li key={p.name} className="rally-reveal group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={p.image}
                  alt={`RALLY ${p.name} on a racket with ${p.flavor.toLowerCase()}`}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col px-1 pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] opacity-70">
                    0{i + 1} · {p.moment}
                  </span>
                </div>
                <h3 className="mt-3 text-3xl font-medium tracking-tight">
                  <RallyWordmark className="mr-3 align-[0.1em] text-2xl" />
                  <em className="font-accent font-normal tracking-[-0.02em] italic">
                    {p.name}
                  </em>
                </h3>
                <p className="mt-2 text-sm text-(--event-primary-text)/75">
                  {p.function}
                </p>
                <p className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-[0.25em]">
                  <span className="mr-2 inline-block size-2 rounded-full bg-citrus align-middle" />
                  {p.flavor}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-24">
          <div>
            <Eyebrow as="h3" label="What’s inside" />
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="border-t border-(--event-primary-text)/25 py-4 text-base font-medium"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
