import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
{ label: "Problem", href: "#problem" },
{ label: "Solution", href: "#solution" },
{ label: "How It Works", href: "#how-it-works" },
{ label: "Experts", href: "/experts" },
{ label: "FAQ", href: "#faq" }];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ?
      "bg-background/90 backdrop-blur-md shadow-sm border-b border-border/50" :
      "bg-transparent"}`
      }>
      
      <div className="max-container section-padding flex h-16 items-center justify-between">
        <a href="#" className="heading-display text-foreground text-2xl">
          Resider.io
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            
              {link.label}
            </a>
          )}
          <Button variant="hero" size="sm" asChild>
            <a href="#founder-form">Request Alignment Call</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu">
          
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen &&
      <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-6 pt-2 animate-fade-in">
          {navLinks.map((link) =>
        <a
          key={link.href}
          href={link.href}
          onClick={() => setMobileOpen(false)}
          className="block py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
          
              {link.label}
            </a>
        )}
          <Button variant="hero" size="sm" className="mt-3 w-full" asChild>
            <a href="#founder-form" onClick={() => setMobileOpen(false)}>
              Request Alignment Call
            </a>
          </Button>
        </div>
      }
    </nav>);

};

export default Navbar;