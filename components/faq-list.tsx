import type { PublicEventData } from "@/lib/happily/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ordered } from "./helpers";
import { Markdown } from "./markdown";

type FaqListProps = {
  faqs: PublicEventData["faqs"];
};

export function FaqList({ faqs }: FaqListProps) {
  return (
    <Accordion type="multiple" className="grid gap-3">
      {ordered(faqs).map((faq) => (
        <AccordionItem
          key={faq.id}
          value={String(faq.id)}
          className="border-t-0 border-x-0 border-b px-0 border-(--event-base-bg)/25 pb-3 text-(--event-base-bg)"
        >
          <AccordionTrigger className="font-semibold hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-(--event-base-bg)/80">
            <Markdown>{faq.answer}</Markdown>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
