import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    them: "Generic business setup firms",
    us: "Precision-led founder infrastructure",
  },
  {
    them: "Fragmented consultant referrals",
    us: "Curated, standards-led expert allocation",
  },
  {
    them: "Random word-of-mouth referrals",
    us: "Founder-stage and industry-matched experts",
  },
  {
    them: "Broad marketplace of advisors",
    us: "Reputation-conscious, execution-depth network",
  },
];

const Differentiation = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="section-padding section-y bg-secondary/40">
      <div className="max-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Why Resider
          </span>
          <h2
            className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            Not another setup company.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {comparisons.map((c, i) => (
            <div
              key={c.us}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-0 rounded-xl overflow-hidden border border-border/60 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="flex items-center gap-3 p-4 bg-card">
                <X size={16} className="text-destructive flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{c.them}</span>
              </div>
              <div className="flex items-center gap-3 p-4 surface-elevated">
                <Check size={16} className="text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{c.us}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
