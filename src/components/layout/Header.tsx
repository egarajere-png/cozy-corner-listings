import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, Mail, X, ChevronUp } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const Topbar = () => {
  return (
    <div className="hidden lg:block bg-smoky-1 border-b border-white/10 py-2">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <address className="flex items-center gap-2 not-italic text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Lakashe Homes, Felma Kahawa Sukari, Nairobi, Kenya</span>
        </address>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Daily: 8:00 am to 6:00 pm</span>
          </div>
          
          <div className="h-4 w-px bg-primary/30" />
          
          <a href="tel:+254123456789" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4 text-primary" />
            <span>+254 715 211 673</span>
          </a>
          
          <div className="h-4 w-px bg-primary/30" />
          
          <a href="mailto:info@lakashehomes.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-4 h-4 text-primary" />
            <span>lakashehomes.gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-eerie-4/95 backdrop-blur-md py-4 border-b border-white/5"
            : "bg-transparent py-6 lg:py-10"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="z-10">
            <h1 className="font-forum text-2xl md:text-3xl text-foreground">
              Lakashe<span className="text-primary">Homes</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-sm uppercase tracking-widest font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="hidden lg:block relative overflow-hidden bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all hover:scale-105"
          >
            Book Site Visit
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 z-10"
            aria-label="Open menu"
          >
            <div className="space-y-1">
              <div className="menu-line" />
              <div className="menu-line menu-line-2" />
              <div className="menu-line menu-line-3" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-full bg-smoky-1 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="ml-auto block p-2 rounded-full border border-foreground/20 text-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mt-8 text-center">
                  <h2 className="font-forum text-2xl">
                    Lakashe<span className="text-primary">Homes</span>
                  </h2>
                </div>

                <ul className="mt-12 border-y border-white/10">
                  {navLinks.map((link) => (
                    <li key={link.href} className="border-b border-white/10 last:border-0">
                      <Link
                        to={link.href}
                        className={`flex items-center gap-3 py-4 text-sm uppercase tracking-widest transition-colors hover:text-primary ${
                          location.pathname === link.href ? "text-primary" : "text-foreground"
                        }`}
                      >
                        <span className="separator" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 text-center space-y-4">
                  <h3 className="font-forum text-xl">Visit Us</h3>
                  <address className="text-muted-foreground not-italic text-sm">
                    Lakashe Homes,<br />
                    Karen, Nairobi, Kenya
                  </address>
                  <p className="text-muted-foreground text-sm">Open: 8:00 am - 6:00 pm</p>
                  <a
                    href="mailto:info@lakashehomes.com"
                    className="block text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    info@lakashehomes.com
                  </a>
                  <div className="separator mx-auto my-6" />
                  <p className="font-bold text-sm">Booking Request</p>
                  <a
                    href="tel:+254123456789"
                    className="text-primary text-xl font-forum hover-underline mx-auto"
                  >
                    +254 123 456 789
                  </a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
