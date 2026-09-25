"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { MobileMenu } from "./mobile-menu";
import { RallyWordmark } from "./rally/logo";
import type { NavLinkItem } from "./navbar";
import { Navbar } from "./navbar";

type HeaderProps = {
  logo?: string | null;
  logoAlt?: string;
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
  hideNavigation?: boolean;
  wordmark?: string;
};

export function Header({
  logo,
  logoAlt = "Logo",
  nav,
  ctaText,
  ctaHref,
  hideNavigation = false,
  wordmark,
}: HeaderProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [heroPassed, setHeroPassed] = useState(false);

  // On the home page the nav stays out of the way until the visitor has
  // scrolled past the hero poster, then slides in.
  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => {
      const hero = document.getElementById("hero");
      setHeroPassed(!hero || hero.getBoundingClientRect().bottom <= 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  const overHero = onHome && !heroPassed;

  if (hideNavigation) {
    return null;
  }

  return (
    <header
      inert={overHero}
      className={cn(
        "sticky top-0 z-40 border-b border-(--event-base-bg)/15 bg-deep/95 text-(--event-base-bg) backdrop-blur transition-[translate,opacity] duration-500",
        overHero && "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-8">
        <div className="relative z-60 flex items-center">
          {!logo && wordmark ? (
            <Link
              href="/"
              className="flex items-center gap-4 whitespace-nowrap"
            >
              <RallyWordmark label={wordmark} className="text-[1.7rem]" />
            </Link>
          ) : null}
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
        <div className="lg:hidden">
          <MobileMenu nav={nav} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
      </div>
    </header>
  );
}
