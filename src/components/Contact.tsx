import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaperPlaneTilt, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form fade from left
      gsap.fromTo(
        formRef.current,
        {
          x: -50,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    gsap.to(".submit-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    toast({
      title: "Message Sent! 🚀",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      id="contact"
    >
      {/* Background orb */}
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <div ref={formRef} className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-input border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn glow-button w-full inline-flex items-center justify-center gap-2 group"
            >
              <span>Send Message</span>
              <PaperPlaneTilt
                size={20}
                weight="bold"
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>

            {/* Social Links */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-center text-muted-foreground mb-4">Or connect with me</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full hover:scale-110 transition-all"
                >
                  <GithubLogo size={24} weight="bold" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full hover:scale-110 transition-all"
                >
                  <LinkedinLogo size={24} weight="bold" />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
