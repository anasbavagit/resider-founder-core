import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SolutionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="solution" ref={ref} className="section-padding section-y bg-primary text-primary-foreground">
      <div className="max-container">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
            isVisible ? "animate-fade-up" : "opacity-0"}`
            }>
            
            The solution
          </span>
          <h2
            className={`heading-display text-[clamp(1.75rem,4vw,3rem)] mb-6 ${
            isVisible ? "animate-fade-up" : "opacity-0"}`
            }
            style={{ animationDelay: "100ms" }}>
            
            Your trusted founder infrastructure layer.
          </h2>
          <p
            className={`text-primary-foreground/70 text-lg leading-relaxed mb-10 ${
            isVisible ? "animate-fade-up" : "opacity-0"}`
            }
            style={{ animationDelay: "200ms" }}>
            
            Resider.io is the strategic answer to fragmented setup and execution. We allocate the right expert support across your full setup and early operational journey — from residency and structuring, through compliance and banking, to early execution. One trusted layer, precision-matched to what you're building.
          



          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${
            isVisible ? "animate-fade-up" : "opacity-0"}`
            }
            style={{ animationDelay: "300ms" }}>
            
            <Button variant="accent" size="lg" asChild>
              <a href="#founder-form">
                Request Alignment Call <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default SolutionSection;