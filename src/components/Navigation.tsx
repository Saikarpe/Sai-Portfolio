import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animate nav on load
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3 }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Animate menu opening
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );

      // Stagger animate menu items
      gsap.fromTo(
        ".nav-link",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
      );

      // Prevent scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 glass-card mx-4 mt-4 md:mx-8 md:mt-6 rounded-2xl"
      >
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            SAI
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} weight="bold" />
            ) : (
              <List size={28} weight="bold" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 bottom-0 w-[280px] z-50 glass-card transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          {/* Close button inside menu */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={28} weight="bold" />
          </button>

          {/* Menu Links */}
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="nav-link text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                style={{ opacity: 0 }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Decorative glow */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 to-transparent blur-xl" />
        </div>
      </div>
    </>
  );
};

export default Navigation;
