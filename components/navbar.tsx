"use client";

import { ScrollLink } from "./scroll-link";

export type NavLinkItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
};

export function Navbar({ nav, ctaText, ctaHref }: NavbarProps) {
  return (
    <nav className="hidden items-center gap-6 text-[11px] font-medium tracking-[0.2em] whitespace-nowrap uppercase lg:flex">
      {nav.map((link) => (
        <ScrollLink key={link.href} href={link.href}>
          {link.label}
        </ScrollLink>
      ))}

      {ctaHref && ctaText ? (
        <ScrollLink
          href={ctaHref}
          className="rounded-full border border-(--event-accent-bg) px-5 py-2.5 font-semibold text-(--event-accent-bg) transition hover:bg-(--event-accent-bg) hover:text-deep"
        >
          {ctaText}
        </ScrollLink>
      ) : null}
    </nav>
  );
}
