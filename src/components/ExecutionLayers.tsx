import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Building2,
  FileCheck,
  ShieldCheck,
  Settings,
  Landmark,
  Zap,
} from "lucide-react";

const layers = [
  {
    icon: Building2,
    title: "Structuring",
    desc: "Get the right legal entity, jurisdiction, and ownership setup — matched to your business model and growth plans.",
  },
  {
    icon: FileCheck,
    title: "Licensing",
    desc: "Secure the correct licenses for your activity, industry, and operational scope — without delays or missteps.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    desc: "Navigate regulatory requirements with clarity — AML, data protection, industry regulations, and ongoing obligations.",
  },
  {
    icon: Settings,
    title: "Operations",
    desc: "Build operational foundations that scale — from HR setup and contracts to workspace and vendor infrastructure.",
  },
  {
    icon: Landmark,
    title: "Banking",
    desc: "Open the right accounts with reduced friction — with experts who understand banking requirements for your sector.",
  },
  {
    icon: Zap,
    title: "Early Execution",
    desc: "Move from setup to action — with trusted operators who help you hire, launch, and deliver in your first critical months.",
  },
];

const ExecutionLayers = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="section-padding section-y" id="layers">
      <div className="max-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Six execution layers
          </span>
          <h2
            className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            Every layer founders need to launch and operate.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {layers.map((layer, i) => (
            <div
              key={layer.title}
              className={`group relative p-6 rounded-xl border border-border/60 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <layer.icon size={20} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-base">
                {layer.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutionLayers;
