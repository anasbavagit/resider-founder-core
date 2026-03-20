import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ExecutionLayers from "@/components/ExecutionLayers";
import HowItWorks from "@/components/HowItWorks";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import ExpertNetwork from "@/components/ExpertNetwork";
import ExpertStandards from "@/components/ExpertStandards";
import Differentiation from "@/components/Differentiation";
import FAQSection from "@/components/FAQSection";
import FounderForm from "@/components/FounderForm";
import ExpertForm from "@/components/ExpertForm";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <Hero />
    <CredibilityStrip />
    <ProblemSection />
    <SolutionSection />
    <ExecutionLayers />
    <HowItWorks />
    <WhoThisIsFor />
    <ExpertNetwork />
    <ExpertStandards />
    <Differentiation />
    <FAQSection />
    <FounderForm />
    <ExpertForm />
    <Footer />
  </div>
);

export default Index;
