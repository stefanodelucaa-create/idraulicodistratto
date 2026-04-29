import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import { usePageTracking } from "@/hooks/usePageTracking";
import IndexBold from "./pages/IndexBold";
import ThankYou from "./pages/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Contatti from "./pages/Contatti";
import Unsubscribe from "./pages/Unsubscribe";
import AdminAuth from "./pages/AdminAuth";
import AdminAnalytics from "./pages/AdminAnalytics";
import Advertorial1 from "./pages/Advertorial1";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RoutedApp() {
  useCartSync();
  usePageTracking();
  return (
    <Routes>
      <Route path="/" element={<IndexBold />} />
      <Route path="/v2" element={<IndexBold />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/termini-condizioni" element={<TermsConditions />} />
      <Route path="/contatti" element={<Contatti />} />
      <Route path="/unsubscribe" element={<Unsubscribe />} />
      <Route path="/admin/auth" element={<AdminAuth />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/adv-1" element={<Advertorial1 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <RoutedApp />
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
