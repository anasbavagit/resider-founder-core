import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ExecutionLayers from "@/components/ExecutionLayers";
import HowItWorks from "@/components/HowItWorks";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import Differentiation from "@/components/Differentiation";
import FAQSection from "@/components/FAQSection";
import FounderForm from "@/components/FounderForm";
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
    <Differentiation />
    <FAQSection />
    <FounderForm />
    <Footer />
  </div>
);

export default Index;
