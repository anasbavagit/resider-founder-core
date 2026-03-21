import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ExpertNetwork = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experts" ref={ref} className="section-padding section-y bg-primary text-primary-foreground">
      <div className="max-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span
              className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Expert network
            </span>
            <h2
              className={`heading-display text-[clamp(1.75rem,4vw,3rem)] mb-6 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              A curated network built on execution depth.
            </h2>
            <p
              className={`text-primary-foreground/70 text-lg leading-relaxed mb-6 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              Resider is assembling a network of operators, consultants, and hybrid
              experts who have real-world execution credibility — not just
              advisory surface presence. Every expert is evaluated on trust,
              industry fit, communication standards, and founder-safe reputation.
            </p>
            <div
              className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: "300ms" }}
            >
              <Button variant="accent" size="lg" asChild>
                <a href="/experts">
                  Join as an Early Expert <ArrowRight size={16} />
                </a>
              </Button>
            </div>
          </div>

          <div
            className={`space-y-4 ${isVisible ? "animate-slide-right" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            {[
              "Operators with demonstrated execution depth",
              "Consultants with real industry authority",
              "Hybrid experts who advise and deliver",
              "Reputation-conscious professionals only",
              "Founder-stage and industry fit evaluated",
              "Clear communication and conduct standards",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-primary-foreground/80"
              >
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertNetwork;
