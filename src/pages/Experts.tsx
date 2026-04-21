import Navbar from "@/components/Navbar";
import ExpertNetwork from "@/components/ExpertNetwork";
import ExpertStandards from "@/components/ExpertStandards";
import ExpertForm from "@/components/ExpertForm";
import Footer from "@/components/Footer";

const Experts = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-16" />
    <ExpertNetwork />
    <ExpertStandards />
    <ExpertForm />
    <Footer />
  </div>
);

export default Experts;
