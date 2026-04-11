import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import IndexBold from "./pages/IndexBold";
import IndexDark from "./pages/IndexDark";
import IndexTech from "./pages/IndexTech";
import IndexHybrid from "./pages/IndexHybrid";
import IndexTripleHybrid from "./pages/IndexTripleHybrid";
import ThankYou from "./pages/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Contatti from "./pages/Contatti";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/v2" element={<IndexBold />} />
        <Route path="/v3" element={<IndexDark />} />
        <Route path="/v4" element={<IndexTech />} />
        <Route path="/v5" element={<IndexHybrid />} />
        <Route path="/v6" element={<IndexTripleHybrid />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termini-condizioni" element={<TermsConditions />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
