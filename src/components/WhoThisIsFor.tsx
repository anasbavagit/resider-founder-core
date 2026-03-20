import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Globe, Building, ShieldCheck } from "lucide-react";

const audiences = [
  {
    icon: Globe,
    title: "International founders entering the UAE",
    desc: "Relocating or launching into one of the world's most dynamic business environments — and needing the setup done right.",
  },
  {
    icon: Building,
    title: "New businesses needing correct setup and support",
    desc: "From entity formation to licensing to banking — getting the foundational layers right before scaling.",
  },
  {
    icon: ShieldCheck,
    title: "Founders in regulated or complex sectors",
    desc: "Fintech, healthcare, education, crypto, logistics — sectors where compliance and structuring precision are non-negotiable.",
  },
];

const WhoThisIsFor = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="section-padding section-y">
      <div className="max-container">
        <div className="max-w-2xl mb-14">
          <span
            className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Who this is for
          </span>
          <h2
            className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            Built for founders who refuse to start wrong.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              className={`p-6 rounded-xl border border-border/60 bg-card hover:shadow-lg hover:border-accent/30 transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <a.icon size={20} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsFor;
