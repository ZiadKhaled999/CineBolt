import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/how-it-works";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/SplashScreen";
import Onboarding from "@/components/Onboarding";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    
    // After splash screen animation (2.5s), show onboarding or main app
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <>
            {showOnboarding ? (
              <Onboarding onComplete={handleOnboardingComplete} />
            ) : (
              <>
                <Navbar />
                <main className="min-h-screen pt-16 md:pt-20 bg-[var(--background-primary)]">
                  <Router />
                </main>
              </>
            )}
          </>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
