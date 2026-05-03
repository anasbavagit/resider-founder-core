import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Field = {
  key: "name" | "email" | "phone" | "industry";
  label: string;
  hint: string;
  type: string;
  placeholder: string;
  validate: (v: string) => string | null;
};

const industrySuggestions = [
  "Fintech",
  "Healthcare",
  "Real Estate",
  "Legal",
  "Banking",
  "Compliance",
  "Operations",
  "Other",
];

const steps: Field[] = [
  {
    key: "name",
    label: "What's your full name?",
    hint: "We use this for the qualification call.",
    type: "text",
    placeholder: "Your full name",
    validate: (v) => (v.trim().length < 2 ? "Please enter your name" : null),
  },
  {
    key: "email",
    label: "Your professional email?",
    hint: "We'll only use this to coordinate the call.",
    type: "email",
    placeholder: "you@company.com",
    validate: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "Enter a valid email",
  },
  {
    key: "phone",
    label: "Best number to reach you?",
    hint: "WhatsApp preferred. Include country code.",
    type: "tel",
    placeholder: "+971 ...",
    validate: (v) => (v.trim().length < 6 ? "Enter a valid phone number" : null),
  },
  {
    key: "industry",
    label: "Which industry are you experienced in?",
    hint: "Be specific — this guides our review.",
    type: "text",
    placeholder: "e.g., Fintech compliance, hospitality operations",
    validate: (v) => (v.trim().length < 2 ? "Tell us your industry" : null),
  },
];

const ExpertIntakeForm = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = async () => {
    const v = (values[current.key] || "").trim();
    const err = current.validate(v);
    if (err) {
      setError(err);
      return;
    }
    setError(null);

    if (!isLast) {
      setStep(step + 1);
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase
      .from("expert_submissions")
      .insert({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        industry: values.industry.trim(),
        status: "waitlist",
      });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-5">
          <CheckCircle size={32} className="text-accent" />
        </div>
        <h3 className="font-serif text-2xl mb-3">You're on the waitlist.</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Our team will reach out personally for a short qualification call before
          any profile is created. We review every applicant manually to protect
          the network's standards.
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-full px-4 py-2">
          <Clock size={14} />
          Typical response: 2–5 business days
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step */}
      <div key={step} className="animate-fade-up">
        <label className="block font-serif text-2xl mb-2 text-foreground">
          {current.label}
        </label>
        <p className="text-sm text-muted-foreground mb-5">{current.hint}</p>

        <input
          autoFocus
          type={current.type}
          value={values[current.key] || ""}
          placeholder={current.placeholder}
          onChange={(e) => {
            setValues({ ...values, [current.key]: e.target.value });
            if (error) setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleNext();
            }
          }}
          className="w-full rounded-lg border border-border bg-card px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all"
        />

        {current.key === "industry" && (
          <div className="flex flex-wrap gap-2 mt-3">
            {industrySuggestions.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() =>
                  setValues({ ...values, industry: s === "Other" ? "" : s })
                }
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-secondary hover:border-accent/40 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p className="text-xs text-destructive mt-2">{error}</p>
        )}

        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          <Button
            type="button"
            variant="accent"
            size="lg"
            onClick={handleNext}
            disabled={submitting}
          >
            {submitting
              ? "Submitting…"
              : isLast
                ? "Join the waitlist"
                : "Continue"}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpertIntakeForm;
