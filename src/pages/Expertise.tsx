import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import {
  Building2,
  FileCheck,
  ShieldCheck,
  Settings,
  Landmark,
  Zap,
} from "lucide-react";

const areas = [
  {
    icon: Building2,
    title: "Structuring",
    subtitle: "Entity & Jurisdiction",
    desc: "Get the right legal entity, jurisdiction, and ownership setup — matched to your business model and growth plans.",
    details: [
      "Free zone vs mainland selection",
      "Shareholding and ownership structuring",
      "Holding company and group setups",
      "Jurisdiction-specific advantages",
    ],
  },
  {
    icon: FileCheck,
    title: "Licensing",
    subtitle: "Activity & Approvals",
    desc: "Secure the correct licenses for your activity, industry, and operational scope — without delays or missteps.",
    details: [
      "Trade license applications",
      "Activity code mapping",
      "Regulatory pre-approvals",
      "Multi-activity licensing",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    subtitle: "Regulatory & Legal",
    desc: "Navigate regulatory requirements with clarity — AML, data protection, industry regulations, and ongoing obligations.",
    details: [
      "AML/KYC framework setup",
      "Data protection compliance",
      "Industry-specific regulations",
      "Ongoing reporting obligations",
    ],
  },
  {
    icon: Settings,
    title: "Operations",
    subtitle: "Infrastructure & Scale",
    desc: "Build operational foundations that scale — from HR setup and contracts to workspace and vendor infrastructure.",
    details: [
      "Employment contracts and HR setup",
      "Visa processing and labor compliance",
      "Office and workspace solutions",
      "Vendor and partner infrastructure",
    ],
  },
  {
    icon: Landmark,
    title: "Banking",
    subtitle: "Accounts & Finance",
    desc: "Open the right accounts with reduced friction — with experts who understand banking requirements for your sector.",
    details: [
      "Corporate account opening",
      "Multi-currency accounts",
      "Payment gateway setup",
      "Sector-specific banking relationships",
    ],
  },
  {
    icon: Zap,
    title: "Early Execution",
    subtitle: "Launch & Momentum",
    desc: "Move from setup to action — with trusted operators who help you hire, launch, and deliver in your first critical months.",
    details: [
      "First hires and team building",
      "Go-to-market preparation",
      "Client acquisition foundations",
      "Operational launch support",
    ],
  },
];

const Expertise = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="section-padding pt-32 pb-20">
        <div className="max-container">
          <div className="max-w-3xl">
            <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${heroVisible ? "animate-fade-up" : "opacity-0"}`}>
              Expertise Areas
            </span>
            <h1 className={`heading-display text-foreground text-[clamp(2rem,5vw,3.5rem)] mb-6 ${heroVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
              Six execution layers. Every capability founders need.
            </h1>
            <p className={`text-lg text-muted-foreground leading-relaxed ${heroVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
              Resider doesn't offer services — we allocate experts across the full operational lifecycle. Each layer is staffed by vetted professionals with real execution depth.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="section-padding pb-24">
        <div className="max-container">
          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area, i) => (
              <div
                key={area.title}
                className={`group p-8 rounded-xl border border-border/60 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 ${gridVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <area.icon size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{area.title}</h3>
                    <span className="text-xs text-muted-foreground tracking-wide uppercase">{area.subtitle}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{area.desc}</p>
                <ul className="space-y-2">
                  {area.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Need expert support across one or more of these layers?</p>
            <Button variant="hero" size="lg" asChild>
              <a href="/#founder-form">Request Alignment Call</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Expertise;
