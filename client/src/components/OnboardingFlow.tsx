import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Film, Star, TrendingUp, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to Should I Watch This?",
      description: "Your personal movie decision assistant",
      icon: <Film className="w-8 h-8 text-primary" />,
      content: (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
            <Film className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">Never waste time on bad movies again</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get instant access to critic and audience scores from trusted sources like 
              Rotten Tomatoes and IMDb, plus intelligent recommendations tailored to help 
              you make the perfect viewing choice.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="bg-green-500/20 rounded-lg p-3 mb-2">
                <Star className="w-6 h-6 text-green-500 mx-auto" />
              </div>
              <p className="text-sm font-medium">Critic Scores</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-lg p-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-500 mx-auto" />
              </div>
              <p className="text-sm font-medium">Audience Ratings</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 rounded-lg p-3 mb-2">
                <CheckCircle className="w-6 h-6 text-purple-500 mx-auto" />
              </div>
              <p className="text-sm font-medium">Smart Verdicts</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "How It Works",
      description: "Simple, fast, and intelligent recommendations",
      icon: <Star className="w-8 h-8 text-primary" />,
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3">Three steps to better movie choices</h3>
            <p className="text-muted-foreground">Our intelligent system analyzes multiple data sources to give you the perfect recommendation</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Search for any movie</h4>
                <p className="text-muted-foreground text-sm">Simply type in the movie title you're considering watching</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Get comprehensive scores</h4>
                <p className="text-muted-foreground text-sm">See ratings from critics (Rotten Tomatoes) and audiences (IMDb) side by side</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Receive smart verdict</h4>
                <p className="text-muted-foreground text-sm">Our algorithm analyzes the scores and gives you a clear recommendation</p>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 mt-8">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Powered by real data</p>
                <p className="text-muted-foreground text-xs">All ratings come directly from OMDb API with live data from trusted sources</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Understanding Verdicts",
      description: "Learn how we make recommendations",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-3">Smart verdict system</h3>
            <p className="text-muted-foreground">Our algorithm considers both critic and audience perspectives to give you the most helpful recommendation</p>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">✅</span>
                <Badge variant="outline" className="border-green-500/30 text-green-600">Go for it!</Badge>
              </div>
              <p className="text-sm text-muted-foreground">High critic scores (75%+) and high audience scores (7.5+). A certified hit that delivers on all fronts.</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">🍿</span>
                <Badge variant="outline" className="border-blue-500/30 text-blue-600">Crowd-Pleaser!</Badge>
              </div>
              <p className="text-sm text-muted-foreground">High audience scores but lower critic scores. Perfect for entertainment value and fun.</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">🧐</span>
                <Badge variant="outline" className="border-yellow-500/30 text-yellow-600">Critics' Darling</Badge>
              </div>
              <p className="text-sm text-muted-foreground">High critic scores but lower audience scores. Great for those who appreciate artistic cinema.</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">❌</span>
                <Badge variant="outline" className="border-red-500/30 text-red-600">Maybe Skip</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Low scores from both critics and audiences. Your time might be better spent elsewhere.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Ready to Start",
      description: "You're all set to make better movie choices",
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      content: (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-br from-primary/20 to-green-500/20 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">You're ready to go!</h3>
            <p className="text-muted-foreground leading-relaxed">
              Start by searching for any movie title. Our system will instantly fetch 
              the latest ratings and give you a personalized recommendation.
            </p>
          </div>
          
          <div className="bg-muted rounded-lg p-6 space-y-4">
            <h4 className="font-semibold">Try these popular searches:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">The Matrix</Badge>
              <Badge variant="secondary">Inception</Badge>
              <Badge variant="secondary">Dune</Badge>
              <Badge variant="secondary">Top Gun: Maverick</Badge>
              <Badge variant="secondary">Everything Everywhere</Badge>
            </div>
          </div>

          <Button onClick={onComplete} className="w-full" size="lg">
            Start Using the App
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {steps[currentStep].icon}
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onComplete}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-border shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {steps[currentStep].content}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className="min-w-[100px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} className="min-w-[100px]">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={onComplete} className="min-w-[100px]">
              Get Started
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};