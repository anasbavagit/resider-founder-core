import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center section-padding overflow-hidden">
      {/* Subtle accent dot */}
      <div className="absolute top-1/4 right-[10%] w-[320px] h-[320px] rounded-full accent-soft-bg opacity-40 blur-3xl pointer-events-none" />

      <div className="max-container w-full pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="opacity-0 animate-fade-up mb-6"
            style={{ animationDelay: "100ms" }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground border border-border rounded-full px-4 py-1.5">
              Founder Infrastructure · UAE
            </span>
          </div>

          {/* Headline */}
          <h1
            className="heading-display text-foreground text-[clamp(2.5rem,6vw,4.5rem)] mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            Start right.
            <br />
            Build with precision.
          </h1>

          {/* Subhead */}
          <p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Resider allocates trusted, industry-specific experts to serious
            founders entering the UAE — so your residency, structure, and
            operations are right from day one.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "550ms" }}
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#founder-form">
                Request Alignment Call
                <ArrowRight size={18} />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="/experts">Join as an Early Expert</a>
            </Button>
          </div>

          {/* Trust line */}
          <p
            className="mt-10 text-sm text-muted-foreground opacity-0 animate-fade-up"
            style={{ animationDelay: "700ms" }}
          >
            Precision-led allocation · Curated expert network · UAE execution
            readiness
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
