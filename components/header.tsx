"use client";

import Image from "next/image";
import Link from "next/link";

import { MobileMenu } from "./mobile-menu";
import type { NavLinkItem } from "./navbar";
import { Navbar } from "./navbar";

type HeaderProps = {
  logo?: string | null;
  logoAlt?: string;
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
  hideNavigation?: boolean;
};

export function Header({
  logo,
  logoAlt = "Logo",
  nav,
  ctaText,
  ctaHref,
  hideNavigation = false,
}: HeaderProps) {
  if (hideNavigation) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-(--event-base-text)/10 bg-(--event-base-bg)/90 backdrop-blur">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-8">
        <div className="relative z-60 flex w-full max-w-40.5 items-center sm:max-w-53">
          {logo && (
            <Link href="/">
              <Image
                src={logo}
                alt={logoAlt}
                width={250}
                height={100}
                className="relative z-60 max-h-12 w-full object-contain object-left"
                draggable={false}
              />
            </Link>
          )}
        </div>

        <Navbar nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        <div className="md:hidden">
          <MobileMenu nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </header>
  );
}
