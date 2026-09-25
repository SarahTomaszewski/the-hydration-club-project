import type { ReactNode } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import { Footer } from "./footer";
import { Header } from "./header";
import { BallPit } from "./rally/ball-pit";
import { RallyWordmark } from "./rally/logo";
import { text } from "./helpers";
import type { NavLinkItem } from "./navbar";

type EventShellProps = {
  eventData: PublicEventData;
  children: ReactNode;
};

export function EventShell({ eventData, children }: EventShellProps) {
  const { event } = eventData;

  const nav: NavLinkItem[] = [
    { label: "RALLY", href: "/#rally" },
    { label: "Schedule", href: "/#agenda" },
    { label: "Experiences", href: "/#experiences" },
    { label: "Hosts", href: "/#speakers" },
    { label: "Venue", href: "/#venue" },
    { label: "FAQ", href: "/#faq" },
    ...(event.photos_toggle ? [{ label: "Gallery", href: "/photos" }] : []),
  ];

  const buttonLinks = event.display_settings.buttonLinks;
  const showCta =
    eventData.form?.is_active &&
    buttonLinks?.navCTA.display &&
    buttonLinks.heroCTA.text;

  return (
    <div className="flex min-h-screen flex-col bg-(--page-bg) text-(--event-base-bg) transition-colors duration-700 ease-out">
      <Header
        logo={event.logo_url}
        logoAlt={`${event.name} logo`}
        wordmark={text(event.content.companyName, event.name)}
        nav={nav}
        hideNavigation={event.display_settings.hideNavigation ?? false}
        ctaText={
          showCta ? text(buttonLinks!.heroCTA.text, "Register") : undefined
        }
        ctaHref={showCta ? "/#register" : undefined}
      />
      {children}
      <footer className="bg-deep text-(--event-base-bg)">
        <div className="relative isolate flex min-h-[26rem] flex-col overflow-hidden md:min-h-[32rem]">
          <BallPit />
          {/* Same type setup as the hero poster: brand, event name, tagline */}
          <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center px-4 pt-14 pb-24 text-center sm:px-8 md:pt-16 md:pb-28">
            <RallyWordmark
              label={text(event.content.companyName, "RALLY")}
              className="text-2xl md:text-3xl"
            />
            <p className="mt-2 text-[10px] font-semibold tracking-[0.5em] uppercase opacity-80">
              Presents
            </p>
            <p className="mt-8 font-script text-[clamp(3rem,9vw,8rem)] leading-[1.05] text-(--event-accent-bg)">
              {event.name}
            </p>
            <p className="mt-6 text-[clamp(1.1rem,2.4vw,1.9rem)] leading-[1.1] font-medium text-(--event-accent-bg) uppercase">
              Game, set, match&hellip; Hydration, served.
            </p>
          </div>
        </div>
        <div className="border-t border-(--event-base-bg)/15">
          <Footer baseBackgroundColor="#202b19" />
        </div>
      </footer>
    </div>
  );
}
