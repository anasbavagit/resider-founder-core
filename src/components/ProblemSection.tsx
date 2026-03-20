import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const problems = [
  "Wrong legal structure from the start",
  "Fragmented, unvetted advice from multiple sources",
  "Weak setup support that delays launch",
  "Unclear compliance requirements",
  "Banking friction that stalls operations",
  "No reliable operational guidance",
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="problem" ref={ref} className="section-padding section-y">
      <div className="max-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <span
              className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              The problem
            </span>
            <h2
              className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] mb-6 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              Founders don't just fail because of bad ideas.
            </h2>
            <p
              className={`text-muted-foreground text-lg leading-relaxed ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              They fail because they start with the wrong foundation — the wrong
              structure, the wrong advice, the wrong setup. In the UAE, where
              regulatory precision and operational clarity matter from day one,
              getting this wrong costs more than money. It costs momentum.
            </p>
          </div>

          <div className="space-y-4">
            {problems.map((item, i) => (
              <div
                key={item}
                className={`flex items-start gap-4 p-4 rounded-lg border border-border/60 bg-card/50 ${
                  isVisible ? "animate-slide-right" : "opacity-0"
                }`}
                style={{ animationDelay: `${150 + i * 80}ms` }}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                  <span className="block w-2 h-2 rounded-full bg-destructive" />
                </span>
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
