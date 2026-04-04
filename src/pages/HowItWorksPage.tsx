import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const founderSteps = [
  {
    num: "01",
    title: "Submit Your Alignment Form",
    desc: "Share what you're building, your stage, industry, and what you need. This isn't a lead form — it's a structured intake that helps us understand your execution requirements.",
    detail: "We ask about your business model, jurisdiction preferences, support areas, and timeline to build a precise picture of what you need.",
  },
  {
    num: "02",
    title: "We Assess Your Requirements",
    desc: "Our team evaluates your submission and maps your needs across all six execution layers — structuring, licensing, compliance, operations, banking, and early execution.",
    detail: "Not every founder needs all layers. We identify gaps, priorities, and the right sequencing for your specific situation.",
  },
  {
    num: "03",
    title: "Expert Allocation",
    desc: "We allocate a precise combination of vetted experts from our network — matched to your industry, stage, and operational needs.",
    detail: "This isn't a marketplace match. Experts are briefed on your context and aligned before any introduction happens.",
  },
  {
    num: "04",
    title: "Launch with Stronger Foundations",
    desc: "You begin working with your allocated experts across the layers that matter most. From entity setup to first hires, you move forward with clarity.",
    detail: "Ongoing support ensures that as your needs evolve, your expert allocation can adapt to match.",
  },
];

const expertSteps = [
  {
    num: "01",
    title: "Submit Your Profile",
    desc: "Share your expertise, industry focus, years of experience, and motivation to join. We look for real execution depth — not surface advisory.",
  },
  {
    num: "02",
    title: "Standards Review",
    desc: "Our team reviews your background against our quality standards. We evaluate industry credibility, communication quality, and founder-readiness.",
  },
  {
    num: "03",
    title: "Selective Onboarding",
    desc: "Accepted experts join a curated network with aligned engagements — no bidding, no marketplace exposure, and full reputation protection.",
  },
];

const HowItWorksPage = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: founderRef, isVisible: founderVisible } = useScrollReveal();
  const { ref: expertRef, isVisible: expertVisible } = useScrollReveal();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="section-padding pt-32 pb-20">
        <div className="max-container">
          <div className="max-w-3xl">
            <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${heroVisible ? "animate-fade-up" : "opacity-0"}`}>
              How It Works
            </span>
            <h1 className={`heading-display text-foreground text-[clamp(2rem,5vw,3.5rem)] mb-6 ${heroVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
              From first conversation to launch-ready — a structured process.
            </h1>
            <p className={`text-lg text-muted-foreground leading-relaxed ${heroVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
              Resider replaces fragmented advice with a precision-led allocation process. Here's exactly how it works — for founders and experts.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Journey */}
      <section ref={founderRef} className="section-padding section-y bg-secondary/40">
        <div className="max-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${founderVisible ? "animate-fade-up" : "opacity-0"}`}>
              For Founders
            </span>
            <h2 className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${founderVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
              The Founder Journey
            </h2>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {founderSteps.map((step, i) => (
              <div
                key={step.num}
                className={`relative pl-16 ${founderVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <span className="absolute left-0 top-0 heading-display text-3xl text-accent/40 w-12 text-right">
                  {step.num}
                </span>
                {i < founderSteps.length - 1 && (
                  <div className="absolute left-6 top-10 bottom-0 w-px border-l border-dashed border-border" />
                )}
                <div className="pb-8">
                  <h3 className="font-semibold text-foreground text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">{step.desc}</p>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Journey */}
      <section ref={expertRef} className="section-padding section-y">
        <div className="max-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${expertVisible ? "animate-fade-up" : "opacity-0"}`}>
              For Experts
            </span>
            <h2 className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${expertVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
              The Expert Pathway
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {expertSteps.map((step, i) => (
              <div
                key={step.num}
                className={`relative p-6 rounded-xl border border-border/60 bg-card ${expertVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <span className="heading-display text-3xl text-accent/30 mb-3 block">{step.num}</span>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < expertSteps.length - 1 && (
                  <ArrowRight size={16} className="hidden md:block absolute top-1/2 -right-4 text-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="section-padding section-y bg-secondary/40">
        <div className="max-container">
          <div className="max-w-2xl mx-auto text-center">
            <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${timelineVisible ? "animate-fade-up" : "opacity-0"}`}>
              What to Expect
            </span>
            <h2 className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] mb-6 ${timelineVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
              Typical Timeline
            </h2>
            <div className={`grid grid-cols-3 gap-4 mb-12 ${timelineVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
              {[
                { time: "24–48 hrs", label: "Initial Assessment" },
                { time: "3–5 days", label: "Expert Allocation" },
                { time: "2–6 weeks", label: "Operational Launch" },
              ].map((t) => (
                <div key={t.label} className="p-4 rounded-lg border border-border/60 bg-card">
                  <span className="heading-display text-xl text-accent block mb-1">{t.time}</span>
                  <span className="text-xs text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
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

export default HowItWorksPage;
