import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const faqItems = [
  {
    question: "Can I Modify or Delete a HeroTag Once Assigned?",
    answer:
      "No, it's not possible to modify or delete a herotag once it's assigned to an address.",
  },
  {
    question: "Where Will My HeroTag Be Visible?",
    answer:
      "The herotag will be visible in the Multiversx Explorer and on the blockchain, but it cannot yet be used as a receiving address in the Maiar application.",
  },
  {
    question: "Can I Test the Generator on a Secondary Wallet?",
    answer:
      "Yes, you can test this generator on a secondary wallet. Remember to not use the definitive herotag during a test, as it will no longer be available.",
  },
  {
    question: "What Are the Requirements for a HeroTag?",
    answer:
      "Your herotag should contain alphanumeric characters (a-z and 0-9 only) and must not already be in use.",
  },
];

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
