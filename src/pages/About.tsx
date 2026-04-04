import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Shield, Target, Compass, Globe } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision Over Volume",
    desc: "We don't match founders with random consultants. We allocate the right combination of experts across every execution layer.",
  },
  {
    icon: Shield,
    title: "Trust as Infrastructure",
    desc: "Every expert in our network is vetted for real execution depth. We protect both founder outcomes and expert reputation.",
  },
  {
    icon: Compass,
    title: "Structure Before Speed",
    desc: "We help founders build correctly from day one — not fast and broken, but right and scalable.",
  },
  {
    icon: Globe,
    title: "Built for the UAE",
    desc: "We understand the regulatory landscape, free zone dynamics, and operational nuances that international founders face.",
  },
];

const About = () => {
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal();
  const { ref: whyRef, isVisible: whyVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="section-padding pt-32 pb-20">
        <div className="max-container">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 animate-fade-up">
              About Resider
            </span>
            <h1 className="heading-display text-foreground text-[clamp(2rem,5vw,3.5rem)] mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Founder infrastructure for the UAE — built on trust, precision, and execution depth.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
              Resider exists because founders entering the UAE deserve more than a business setup package. They deserve a structured support system — curated experts, aligned incentives, and operational clarity from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="section-padding section-y bg-secondary/40">
        <div className="max-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${missionVisible ? "animate-fade-up" : "opacity-0"}`}>
                Our Mission
              </span>
              <h2 className={`heading-display text-foreground text-[clamp(1.75rem,4vw,2.75rem)] mb-6 ${missionVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
                We believe the right foundation determines everything that follows.
              </h2>
              <p className={`text-muted-foreground leading-relaxed mb-4 ${missionVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
                Most founders in the UAE start with fragmented advice — a business setup agent here, a random consultant there. They piece together their foundation from disconnected sources with misaligned incentives.
              </p>
              <p className={`text-muted-foreground leading-relaxed ${missionVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
                Resider changes that. We assess each founder's needs and allocate a precise combination of vetted experts across structuring, licensing, compliance, operations, banking, and early execution — so founders launch with the foundations to succeed sustainably.
              </p>
            </div>
            <div className={`relative ${missionVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <blockquote className="text-lg text-foreground italic leading-relaxed">
                  "Start right, operate well, succeed sustainably."
                </blockquote>
                <p className="text-sm text-muted-foreground mt-4">— The Resider Principle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="section-padding section-y">
        <div className="max-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${valuesVisible ? "animate-fade-up" : "opacity-0"}`}>
              How We Operate
            </span>
            <h2 className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${valuesVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
              Principles that define our platform.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`group p-6 rounded-xl border border-border/60 bg-card hover:border-accent/30 hover:shadow-lg transition-all duration-300 ${valuesVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <v.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why UAE */}
      <section ref={whyRef} className="section-padding section-y bg-secondary/40">
        <div className="max-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${whyVisible ? "animate-fade-up" : "opacity-0"}`}>
              Why the UAE
            </span>
            <h2 className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] mb-6 ${whyVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
              The world's fastest-growing founder ecosystem demands better infrastructure.
            </h2>
            <p className={`text-muted-foreground leading-relaxed mb-6 ${whyVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
              The UAE offers founders unmatched advantages — tax efficiency, global connectivity, investor proximity, and regulatory innovation. But navigating its multi-jurisdictional setup, licensing requirements, and banking landscape requires precision that generic services can't deliver.
            </p>
            <p className={`text-muted-foreground leading-relaxed ${whyVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
              Resider was built specifically for this environment — to help founders cut through complexity and launch with the operational clarity they need to scale.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
