import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const expertTypes = ["Operator", "Consultant", "Hybrid"];

const ExpertSignupForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    setSubmitting(true);

    const yearsRaw = (form.get("years") as string)?.trim();
    const { error } = await supabase.from("expert_submissions").insert({
      name,
      email,
      phone: (form.get("phone") as string)?.trim() || null,
      linkedin: (form.get("linkedin") as string)?.trim() || null,
      role: (form.get("role") as string)?.trim() || null,
      expertise: (form.get("expertise") as string)?.trim() || null,
      industry: (form.get("industry") as string)?.trim() || null,
      years_experience: yearsRaw ? parseInt(yearsRaw, 10) : null,
      expert_type: (form.get("expert_type") as string) || null,
      advises_founders: (form.get("advises") as string) || null,
      summary: (form.get("summary") as string)?.trim() || null,
      why_join: (form.get("why_join") as string)?.trim() || null,
    });

    setSubmitting(false);
    if (error) {
      setErrors({ form: "Something went wrong. Please try again." });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={48} className="mx-auto text-accent mb-4" />
        <h3 className="font-serif text-2xl mb-3">Interest received.</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Thank you for your interest in joining the Resider expert network.
          Your submission will go through our standards-led review. We'll be in touch if there's a fit.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold mb-1.5">Full Name *</label>
          <input name="name" className={inputClass} placeholder="Your full name" />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5">Email *</label>
          <input name="email" type="email" className={inputClass} placeholder="you@email.com" />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold mb-1.5">Phone / WhatsApp</label>
          <input name="phone" className={inputClass} placeholder="+971..." />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5">LinkedIn Profile</label>
          <input name="linkedin" className={inputClass} placeholder="linkedin.com/in/..." />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold mb-1.5">Current Role / Title</label>
          <input name="role" className={inputClass} placeholder="e.g., COO, Compliance Lead" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5">Area of Expertise</label>
          <input name="expertise" className={inputClass} placeholder="e.g., Banking, Licensing" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold mb-1.5">Industry Focus</label>
          <input name="industry" className={inputClass} placeholder="e.g., Fintech, Healthcare" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5">Years of Experience</label>
          <input name="years" type="number" min="0" className={inputClass} placeholder="e.g., 8" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5">Expert Type</label>
        <div className="flex gap-4">
          {expertTypes.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="expert_type" value={t} className="accent-accent" />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5">
          Do you currently advise founders or businesses?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="advises" value={opt} className="accent-accent" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5">Short summary of your experience</label>
        <textarea name="summary" rows={3} className={inputClass} placeholder="Key highlights of your professional background…" />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5">Why do you want to join Resider early?</label>
        <textarea name="why_join" rows={3} className={inputClass} placeholder="What draws you to a curated, standards-led network…" />
      </div>

      {errors.form && (
        <p className="text-xs text-destructive text-center">{errors.form}</p>
      )}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting}>
        {submitting ? "Submitting…" : "Join as an Early Expert"}
      </Button>
    </form>
  );
};

export default ExpertSignupForm;
