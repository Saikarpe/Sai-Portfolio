import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.png";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";
import project6 from "@/assets/project-6.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Human Interface",
    description: "Advanced AI-powered human-robot interaction system with real-time learning",
    image: project1,
    tech: ["AI/ML", "Python", "TensorFlow"],
  },
  {
    title: "Mart Dashboard",
    description: "Modern e-commerce analytics dashboard with real-time insights",
    image: project2,
    tech: ["React", "TypeScript", "Charts"],
  },
  {
    title: "3D Portfolio Site",
    description: "Immersive portfolio with Spline 3D integration and smooth animations",
    image: project3,
    tech: ["React", "Spline", "GSAP"],
  },
  {
    title: "Gaming Website",
    description: "Dynamic gaming platform with stunning visuals and user engagement",
    image: project4,
    tech: ["React", "CSS3", "JavaScript"],
  },
  {
    title: "Animation Showcase",
    description: "Interactive web animation tools demonstration with GSAP and Three.js",
    image: project5,
    tech: ["GSAP", "Three.js", "React"],
  },
  {
    title: "Animated Portfolio",
    description: "Sleek developer portfolio with scroll-triggered animations",
    image: project6,
    tech: ["React", "GSAP", "Tailwind"],
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".projects-title",
        {
          y: 50,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      id="projects"
    >
      {/* Background orbs */}
      <div className="glow-orb w-[600px] h-[600px] top-0 right-0 opacity-20" />
      <div className="glow-orb w-[500px] h-[500px] bottom-0 left-0 opacity-25" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="projects-title text-4xl md:text-6xl font-bold text-center mb-16">
          Featured <span className="text-primary">Projects</span>
        </h2>

        {/* Horizontal scrollable on mobile, grid on desktop */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                  View Project
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
