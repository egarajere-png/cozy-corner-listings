import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from "lucide-react";
import footerBg from "@/assets/footer-bg.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export const Footer = () => {
  return (
    <footer 
      className="relative py-16 lg:py-24 text-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-6 lg:border-x lg:border-white/10 lg:px-8">
            <Link to="/" className="inline-block">
              <h2 className="font-forum text-3xl">
                Lakashe<span className="text-primary">Homes</span>
              </h2>
            </Link>

            <address className="not-italic text-muted-foreground space-y-2">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Felma, Kahawa Sukari, Nairobi, Kenya</span>
              </div>
              <a href="mailto:info@lakashehomes.com" className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>ilakashehomes@gmail.com</span>
              </a>
              <a href="tel:+254123456789" className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span>+254 119 792 689</span>
              </a>
            </address>

            <p className="text-muted-foreground">Open: 8:00 am - 6:00 pm</p>

            <div className="flex items-center justify-center gap-2">
              <div className="separator" />
              <div className="separator" />
              <div className="separator" />
            </div>

            <div className="space-y-4">
              <h3 className="font-forum text-xl">Get News & Offers</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe & Get <span className="text-primary">Property Updates</span>
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-eerie-2 border border-white/10 text-foreground py-3 pl-12 pr-4 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-forum text-xl">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider hover-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="font-forum text-xl">Connect With Us</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider hover-underline inline-block"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-muted-foreground text-sm">
            &copy; 2026 Lakashe Homes. All Rights Reserved | Crafted By Bahati Jere Egara
          </p>
        </div>
      </div>
    </footer>
  );
};
