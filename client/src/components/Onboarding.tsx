import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Film, Tv, Heart, Star } from 'lucide-react';

const onboardingSteps = [
  {
    title: "Welcome to CineBolt",
    description: "Your personal gateway to endless entertainment. Discover, track, and enjoy your favorite movies and TV shows.",
    icon: Film,
  },
  {
    title: "Extensive Library",
    description: "Access a vast collection of movies and TV shows, from classics to the latest releases.",
    icon: Tv,
  },
  {
    title: "Create Your Watchlist",
    description: "Save your favorite content and keep track of what you want to watch next.",
    icon: Heart,
  },
  {
    title: "Rate & Review",
    description: "Share your thoughts and see what others think about your favorite content.",
    icon: Star,
  },
];

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background-primary)]">
      <div className="w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                {React.createElement(onboardingSteps[currentStep].icon, {
                  size: 48,
                  className: "text-[var(--primary-accent)]"
                })}
              </motion.div>
              
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent"
              >
                {onboardingSteps[currentStep].title}
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[var(--text-secondary)] text-lg"
              >
                {onboardingSteps[currentStep].description}
              </motion.p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleNext}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>{currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}</span>
                <ChevronRight size={20} />
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex space-x-2"
              >
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'w-8 bg-[var(--primary-accent)]'
                        : 'bg-[var(--dark-accent)]'
                    }`}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding; 