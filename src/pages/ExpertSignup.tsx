import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpertSignupForm from "@/components/ExpertSignupForm";

const ExpertSignup = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="max-w-xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">
            Expert Network
          </span>
          <h1 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-foreground mb-3">
            Join as an Early Expert
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Apply to join a curated, standards-led network of operators and consultants supporting serious founders in the UAE.
          </p>
        </div>

        {/* UAE Pass Button */}
        <button
          type="button"
          disabled
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3.5 text-sm font-semibold text-foreground shadow-sm hover:bg-secondary transition-colors mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
          title="UAE Pass integration coming soon"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#1C3A5F"/>
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">UAE</text>
          </svg>
          Sign up with UAE Pass
          <span className="ml-auto text-[10px] text-muted-foreground font-normal">Coming soon</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">or fill in manually</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <ExpertSignupForm />
      </div>
    </div>
    <Footer />
  </div>
);

export default ExpertSignup;
