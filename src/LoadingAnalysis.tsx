import { Loader2, Scan, Brain, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { icon: Scan, label: "Scanning image...", duration: 1500 },
  { icon: Brain, label: "AI processing features...", duration: 2000 },
  { icon: CheckCircle, label: "Finalizing analysis...", duration: 1000 },
];

const LoadingAnalysis = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let elapsed = 0;

    steps.forEach((step, index) => {
      if (index > 0) {
        const timer = setTimeout(() => {
          setCurrentStep(index);
        }, elapsed);
        timers.push(timer);
      }
      elapsed += step.duration;
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-6">
        Analyzing Drone Imagery
      </h3>

      <div className="space-y-3 w-full max-w-xs">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-primary/10 border border-primary/30"
                  : isComplete
                  ? "bg-success/10 border border-success/30"
                  : "bg-secondary/50 border border-transparent"
              }`}
            >
              <StepIcon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-primary"
                    : isComplete
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-sm ${
                  isActive || isComplete
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
              {isActive && (
                <Loader2 className="w-4 h-4 text-primary animate-spin ml-auto" />
              )}
              {isComplete && (
                <CheckCircle className="w-4 h-4 text-success ml-auto" />
              )}
            </div>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground mt-6 text-center">
        Identifying buildings, roads, water bodies, and key infrastructure...
      </p>
    </div>
  );
};

export default LoadingAnalysis;
