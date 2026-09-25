import type { HappilyEnv, PublicEventData } from "@/lib/happily/types";

import { RallyExperiences, RallyGuests } from "./rally/club";
import {
  RallyFaq,
  RallyMenu,
  RallyPartners,
  RallyRsvp,
  RallyVenue,
} from "./rally/closing";
import { RallyHero } from "./rally/hero";
import { RallyProducts } from "./rally/products";
import { RallyQuoteBand, RallySchedule } from "./rally/schedule";

type EventPageProps = {
  eventData: PublicEventData;
  eventId: string;
  env: HappilyEnv;
};

export function EventPage({ eventData, eventId, env }: EventPageProps) {
  const { event, form, sessions, speakers, sponsors, faqs } = eventData;
  const heroCta = event.display_settings.buttonLinks?.heroCTA;
  const founder = speakers.find((s) => /founder/i.test(s.title ?? ""));

  return (
    <main>
      <RallyHero
        event={event}
        showCta={Boolean(form?.is_active && heroCta?.display && heroCta.text)}
      />

      <RallyProducts />
      <RallyQuoteBand founder={founder} />

      {sessions.length ? (
        <RallySchedule event={event} sessions={sessions} speakers={speakers} />
      ) : null}

      <RallyExperiences />

      {speakers.length ? (
        <RallyGuests event={event} speakers={speakers} />
      ) : null}

      {/* Venue sits between the two dark sections so they don't run together */}
      <RallyVenue />
      <RallyMenu />

      {sponsors.length ? (
        <RallyPartners event={event} sponsors={sponsors} />
      ) : null}

      {form ? (
        <RallyRsvp event={event} form={form} eventId={eventId} env={env} />
      ) : null}

      {faqs.length ? <RallyFaq event={event} faqs={faqs} /> : null}
    </main>
  );
}
