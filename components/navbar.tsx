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
    <nav className="hidden items-center gap-5 text-sm md:flex">
      {nav.map((link) => (
        <ScrollLink key={link.href} href={link.href}>
          {link.label}
        </ScrollLink>
      ))}

      {ctaHref && ctaText ? (
        <ScrollLink
          href={ctaHref}
          className="rounded-(--event-border-radius) bg-(--event-primary-bg) px-4 py-2 font-semibold text-(--event-primary-text)"
        >
          {ctaText}
        </ScrollLink>
      ) : null}
    </nav>
  );
}
