import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "../../utils/contants";

export default function HeroTagFqa() {
  return (
    <div className="w-full text-left max-w-[500px] mt-20">
      <h2 className="mb-4 text-center text-xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
        FAQ
      </h2>

      <Accordion type="single" collapsible>
        {faqItems.map((item, index) => (
          <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
