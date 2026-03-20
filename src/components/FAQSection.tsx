import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is Resider a business setup company?",
    a: "No. Resider is a founder infrastructure platform. We don't sell packages — we allocate trusted, curated experts across the operational layers founders need to launch and operate in the UAE. Setup is one part of the journey, not the whole product.",
  },
  {
    q: "Do you only help with residency?",
    a: "Residency is one of six execution layers we support. Resider covers structuring, licensing, compliance, operations, banking, and early execution — because getting a visa alone doesn't make a business functional.",
  },
  {
    q: "How do you choose experts?",
    a: "Every expert is evaluated on real operating credibility, founder-stage fit, industry relevance, communication standards, and reputation integrity. We don't run an open marketplace — we run a curated, standards-led network.",
  },
  {
    q: "Can experts apply early?",
    a: "Yes. We're building the founding cohort of our expert network now. Early experts who meet our standards will shape the ecosystem and gain priority allocation as the platform grows.",
  },
  {
    q: "How is expert reputation protected?",
    a: "Resider is designed to protect expert reputation as much as founder trust. Allocation is precision-led, expectations are clear, and the network operates with professional standards — not marketplace noise.",
  },
  {
    q: "Can you support regulated industries?",
    a: "Absolutely. Founders in fintech, healthcare, crypto, education, and other regulated or operationally complex sectors are a core part of our focus. We match experts with specific industry and compliance depth.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="faq" ref={ref} className="section-padding section-y">
      <div className="max-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span
              className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              FAQ
            </span>
            <h2
              className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              Questions we hear from founders and experts.
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline hover:text-accent transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
