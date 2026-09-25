"use client";

import { Dialog as DialogPrimitive, VisuallyHidden } from "radix-ui";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import type { NavLinkItem } from "./navbar";
import { ScrollLink } from "./scroll-link";
import { Button } from "./ui/button";

type MobileMenuProps = {
  nav: NavLinkItem[];
  ctaText?: string;
  ctaHref?: string;
};

export function MobileMenu({ nav, ctaText, ctaHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <MenuIcon className="size-5" />
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-(--event-base-bg) text-(--event-base-text) shadow-lg outline-none",
            "data-open:animate-in data-open:slide-in-from-right",
            "data-closed:animate-out data-closed:slide-out-to-right",
          )}
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>Navigation</DialogPrimitive.Title>
          </VisuallyHidden.Root>
          <div className="flex items-center justify-end px-4 py-3">
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close menu">
                <XIcon className="size-5" />
              </Button>
            </DialogPrimitive.Close>
          </div>

          <nav className="flex flex-col gap-1 px-4">
            {nav.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                onClick={() => !link.href.includes("#") && setOpen(false)}
                onAfterScroll={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-(--event-base-text)/5"
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>

          {ctaHref && ctaText ? (
            <div className="mt-auto border-t border-(--event-base-text)/10 p-4">
              <ScrollLink
                href={ctaHref}
                onAfterScroll={() => setOpen(false)}
                className="block rounded-(--event-border-radius) bg-(--event-primary-bg) px-4 py-3 text-center font-semibold text-(--event-primary-text)"
              >
                {ctaText}
              </ScrollLink>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
