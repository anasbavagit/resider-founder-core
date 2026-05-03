import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Experts from "./pages/Experts.tsx";
import ExpertSignup from "./pages/ExpertSignup.tsx";
import ExpertCompleteProfile from "./pages/ExpertCompleteProfile.tsx";
import AdminExperts from "./pages/AdminExperts.tsx";
import Auth from "./pages/Auth.tsx";
import About from "./pages/About.tsx";
import Expertise from "./pages/Expertise.tsx";
import HowItWorksPage from "./pages/HowItWorksPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToHash from "./components/ScrollToHash.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/experts/signup" element={<ExpertSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
