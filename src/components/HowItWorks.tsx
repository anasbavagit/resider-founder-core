import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  {
    num: "01",
    title: "Tell us what you're building",
    desc: "Share your business concept, stage, and what you need to launch or operate in the UAE.",
  },
  {
    num: "02",
    title: "We assess your needs",
    desc: "We evaluate your launch requirements, operational gaps, and industry-specific demands.",
  },
  {
    num: "03",
    title: "We align the right experts",
    desc: "We match you with curated professionals across the exact execution layers you need.",
  },
  {
    num: "04",
    title: "You launch with stronger foundations",
    desc: "Start with the right structure, the right support, and the clarity to execute from day one.",
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="how-it-works" ref={ref} className="section-padding section-y bg-secondary/40">
      <div className="max-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            How it works
          </span>
          <h2
            className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            From first conversation to launch-ready.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <span className="heading-display text-4xl text-accent/30 mb-3 block">
                {step.num}
              </span>
              <h3 className="font-semibold text-foreground mb-2 text-base">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 right-0 translate-x-1/2 w-8 border-t border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
