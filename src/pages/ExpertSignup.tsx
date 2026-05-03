import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpertIntakeForm from "@/components/ExpertIntakeForm";

const ExpertSignup = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="max-w-xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">
            Expert Network · Waitlist
          </span>
          <h1 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-foreground mb-3">
            Apply to join the network
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Four quick questions. If there's a fit, our team will reach out
            personally for a short qualification call before any profile is
            created.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <ExpertIntakeForm />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Already invited?{" "}
          <a href="/auth" className="text-accent hover:underline">
            Sign in to complete your profile
          </a>
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

export default ExpertSignup;
