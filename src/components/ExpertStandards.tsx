import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ShieldCheck, Eye, MessageCircle, Star, Lock, Search } from "lucide-react";

const standards = [
  {
    icon: Search,
    text: "Careful selection based on real expertise and operating credibility",
  },
  {
    icon: Star,
    text: "Clear fit with founder-stage and industry needs",
  },
  {
    icon: MessageCircle,
    text: "Professional conduct and communication standards",
  },
  {
    icon: ShieldCheck,
    text: "Reputation-conscious participation in a curated ecosystem",
  },
  {
    icon: Lock,
    text: "No noisy marketplace dynamic — precision allocation only",
  },
  {
    icon: Eye,
    text: "Demonstrated execution depth, not just surface advisory presence",
  },
];

const ExpertStandards = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="section-padding section-y">
      <div className="max-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span
              className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Expert standards
            </span>
            <h2
              className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] mb-4 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              Trust is the product. Standards are the filter.
            </h2>
            <p
              className={`text-muted-foreground text-lg leading-relaxed ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              Resider protects both founder trust and expert reputation. Every
              professional in our network meets a clear threshold of credibility,
              conduct, and execution capability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {standards.map((s, i) => (
              <div
                key={s.text}
                className={`flex items-start gap-4 p-5 rounded-xl border border-border/60 bg-card hover:shadow-md hover:border-accent/20 transition-all duration-300 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${250 + i * 80}ms` }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                  <s.icon size={18} className="text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground leading-relaxed">
                  {s.text}
                </span>
              </div>
            ))}
          </div>

          <p
            className={`text-center mt-10 text-base font-semibold text-foreground italic ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "700ms" }}
          >
            "Your reputation is protected inside a curated, standards-led
            network."
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpertStandards;
