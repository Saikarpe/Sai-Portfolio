import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileHtml,
  FileCss,
  FileJs,
  FramerLogo,
  Database,
  GitBranch,
} from "@phosphor-icons/react";
import profileImg from "@/assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", icon: FileHtml },
  { name: "CSS", icon: FileCss },
  { name: "JavaScript", icon: FileJs },
  { name: "React", icon: FramerLogo },
  { name: "Database", icon: Database },
  { name: "Git", icon: GitBranch },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Image animation - slide from left with rotation
      gsap.fromTo(
        imageRef.current,
        {
          x: -100,
          opacity: 0,
          rotation: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Skills stagger animation
      gsap.fromTo(
        skillsRef.current?.children || [],
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
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
      id="about"
    >
      {/* Background orb */}
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Profile Image */}
          <div ref={imageRef} className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                <img
                  src={profileImg}
                  alt="Sai Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Bio & Skills */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                Passionate Developer & AI Enthusiast
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I specialize in building modern, responsive web applications with a focus on user experience and cutting-edge technologies. With expertise in AI/ML, I create intelligent solutions that push the boundaries of what's possible on the web.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey combines creative design with technical excellence, delivering projects that not only look stunning but perform flawlessly.
              </p>
            </div>

            {/* Skills Grid */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Core Skills</h4>
              <div ref={skillsRef} className="grid grid-cols-3 gap-4">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="glass-card p-4 flex flex-col items-center gap-3 group hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Icon
                        size={32}
                        weight="light"
                        className="text-primary group-hover:text-accent transition-colors"
                      />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
