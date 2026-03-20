import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const stages = ["Idea", "Pre-launch", "Launching", "Operating"];
const supportOptions = [
  "Residency",
  "Business Setup",
  "Structuring",
  "Licensing",
  "Compliance",
  "Banking",
  "Operations",
  "Early Execution",
  "Industry Expert Access",
];

const FounderForm = () => {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [support, setSupport] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSupport = (s: string) =>
    setSupport((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    const name = (form.get("name") as string)?.trim();
    const email = (form.get("email") as string)?.trim();
    if (!name) newErrors.name = "Required";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Valid email required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="founder-form" ref={ref} className="section-padding section-y">
        <div className="max-container max-w-2xl mx-auto text-center">
          <div className="animate-fade-up">
            <CheckCircle size={48} className="mx-auto text-accent mb-4" />
            <h3 className="heading-display text-2xl text-foreground mb-3">
              Request received.
            </h3>
            <p className="text-muted-foreground">
              Your alignment request has been submitted and will be reviewed. We
              connect with founders who are a clear fit for precision-led
              support. Expect to hear from us soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all";

  return (
    <section id="founder-form" ref={ref} className="section-padding section-y bg-secondary/40">
      <div className="max-container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span
            className={`inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            For founders
          </span>
          <h2
            className={`heading-display text-foreground text-[clamp(1.75rem,4vw,3rem)] ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            Request an alignment call.
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "200ms" }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Full Name *
              </label>
              <input name="name" className={inputClass} placeholder="Your full name" />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Email *
              </label>
              <input name="email" type="email" className={inputClass} placeholder="you@company.com" />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Phone / WhatsApp
              </label>
              <input name="phone" className={inputClass} placeholder="+971..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Company or Project Name
              </label>
              <input name="company" className={inputClass} placeholder="Your project" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Stage
              </label>
              <select name="stage" className={inputClass}>
                <option value="">Select stage</option>
                {stages.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Industry
              </label>
              <input name="industry" className={inputClass} placeholder="e.g., Fintech, SaaS" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Are you already in the UAE?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="radio" name="in_uae" value={opt} className="accent-accent" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              What support do you need?
            </label>
            <div className="flex flex-wrap gap-2">
              {supportOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleSupport(opt)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    support.includes(opt)
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Briefly describe what you're building
            </label>
            <textarea
              name="description"
              rows={3}
              className={inputClass}
              placeholder="A short summary of your business concept…"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Preferred contact method
            </label>
            <select name="contact_method" className={inputClass}>
              <option value="">Select</option>
              <option value="Email">Email</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone">Phone</option>
            </select>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full">
            Request Alignment
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FounderForm;
