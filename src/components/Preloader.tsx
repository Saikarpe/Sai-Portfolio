import { useEffect, useState } from "react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setProgress(100);

        // Animate out after completion
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              onComplete();
            },
          });

          tl.to(".preloader-progress", {
            opacity: 0,
            duration: 0.3,
          })
            .to(".preloader-container", {
              opacity: 0,
              scale: 0.95,
              duration: 0.8,
              ease: "power2.inOut",
            });
        }, 300);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="preloader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Animated background orbs */}
      <div className="glow-orb w-96 h-96 top-1/4 left-1/4" />
      <div className="glow-orb w-96 h-96 bottom-1/4 right-1/4" />

      <div className="preloader-progress relative z-10 text-center">
        {/* Logo/Name */}
        <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
          SAI
        </h1>

        {/* Progress Bar Container */}
        <div className="w-80 md:w-96 mx-auto mb-6">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-2xl font-light text-muted-foreground">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
