import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Target, Shield, Rocket, Users } from "lucide-react";

const pillars = [
  { icon: Target, label: "Precision-led expert allocation" },
  { icon: Shield, label: "Trusted UAE founder support" },
  { icon: Rocket, label: "Residency + setup + execution readiness" },
  { icon: Users, label: "Built for serious founders" },
];

const CredibilityStrip = () => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <section ref={ref} className="border-y border-border bg-secondary/50">
      <div className="max-container section-padding py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className={`flex items-center gap-3 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <p.icon size={18} className="text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground leading-tight">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityStrip;
