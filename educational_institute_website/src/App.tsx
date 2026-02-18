import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ROUTE_PATHS } from "@/lib/index";
import { Layout } from "@/components/Layout";

// Page Imports
import Home from "@/pages/Home";
import Lectures from "@/pages/Lectures";
import Notes from "@/pages/Notes";
import Teachers from "@/pages/Teachers";
import Results from "@/pages/Results";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import { AdminPanel } from "@/components/AdminPanel";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

/**
 * Wrapper for AdminPanel to handle navigation logic for the 'onClose' prop
 */
function AdminPanelWrapper() {
  const navigate = useNavigate();
  return <AdminPanel onClose={() => navigate(ROUTE_PATHS.HOME)} />;
}

/**
 * Static page for the 'Thank You' message triggered by the secret footer text
 */
function ThankYouPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            G
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Thank you for visiting Genius Classes
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          We appreciate your interest in our coaching institute. Our mission is to build a strong foundation for every student from Std 1 to 10.
        </p>
        <div className="mt-12 text-sm font-medium text-primary uppercase tracking-widest">
          © 2026 Genius Classes
        </div>
      </div>
    </Layout>
  );
}

/**
 * Main Application Component
 * Configures routing, providers, and global layout structures
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <Router>
          <Routes>
            {/* Public Pages wrapped in main Layout */}
            <Route
              path={ROUTE_PATHS.HOME}
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.LECTURES}
              element={
                <Layout>
                  <Lectures />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.NOTES}
              element={
                <Layout>
                  <Notes />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.TEACHERS}
              element={
                <Layout>
                  <Teachers />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.RESULTS}
              element={
                <Layout>
                  <Results />
                </Layout>
              }
            />
            <Route
              path={ROUTE_PATHS.CONTACT}
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />

            {/* Special Thank You Page (Normal click on footer text) */}
            <Route path="/thank-you" element={<ThankYouPage />} />

            {/* Admin Access Routes */}
            <Route path={ROUTE_PATHS.ADMIN_LOGIN} element={<AdminLogin />} />
            <Route path={ROUTE_PATHS.ADMIN_PANEL} element={<AdminPanelWrapper />} />

            {/* Catch-all Redirect to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;