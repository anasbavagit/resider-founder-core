import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";

const experts = [
  { specialty: "Corporate Structuring", years: 14, bg: "Big Four Advisory", sectors: ["Fintech", "Holding Companies"] },
  { specialty: "Banking Relationships", years: 12, bg: "Tier-1 UAE Bank", sectors: ["SME", "E-commerce"] },
  { specialty: "Free Zone Licensing", years: 9, bg: "DMCC & ADGM", sectors: ["Technology", "Trading"] },
  { specialty: "Regulatory Compliance", years: 11, bg: "International Law Firm", sectors: ["Healthcare", "Finance"] },
  { specialty: "HR & Operations", years: 8, bg: "Regional Scale-up", sectors: ["SaaS", "Services"] },
  { specialty: "Go-to-Market Strategy", years: 10, bg: "Venture-backed Startups", sectors: ["Consumer", "B2B"] },
];

const ExpertShowcase = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="section-padding section-y bg-secondary/40">
      <div className="max-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            Network Preview
          </span>
          <h2 className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] mb-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            Meet the calibre of experts in our network.
          </h2>
          <p className={`text-muted-foreground ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            Anonymized profiles from our curated network. Real execution depth across every layer.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {experts.map((expert, i) => (
            <div
              key={expert.specialty}
              className={`group p-6 rounded-xl border border-border/60 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${250 + i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
                  {expert.specialty.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{expert.specialty}</h3>
                  <span className="text-xs text-muted-foreground">{expert.years} years experience</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Previously at <span className="text-foreground">{expert.bg}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {expert.sectors.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero-outline" size="lg" asChild>
            <a href="/experts/signup">Join as an Expert</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertShowcase;
