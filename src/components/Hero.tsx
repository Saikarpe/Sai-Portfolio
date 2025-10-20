import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "@phosphor-icons/react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate headline with blur-to-clear effect
      tl.fromTo(
        headlineRef.current,
        {
          y: 50,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        }
      )
        // Animate subtitle
        .fromTo(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        // Animate CTA button
        .fromTo(
          ctaRef.current,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        // Fade in Spline from right
        .fromTo(
          splineRef.current,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Spline 3D Background - Full Screen */}
      <div ref={splineRef} className="absolute inset-0 w-full h-full">
        <iframe
          src="https://my.spline.design/orb-92Onr00v0ulDjbkjnWumO5XV/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Orb"
        />
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />

      {/* Animated background orbs */}
      <div className="glow-orb w-[600px] h-[600px] top-0 left-0 opacity-20 z-[2]" />
      <div className="glow-orb w-[500px] h-[500px] bottom-0 right-0 opacity-30 z-[2]" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Sai
            </span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl text-foreground/80 font-light">
              AI/ML Enthusiast
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto"
          >
            Crafting intelligent solutions through cutting-edge machine learning and modern web technologies
          </p>

          <button
            ref={ctaRef}
            onClick={scrollToProjects}
            className="glow-button inline-flex items-center gap-2 group"
          >
            Hire Me
            <ArrowRight
              size={20}
              weight="bold"
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
