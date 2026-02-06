import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Instagram, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/lookbook", label: "Lookbook" },
    { path: "/about", label: "About" },
    { path: "/reviews", label: "Reviews" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <span className="font-display text-2xl md:text-3xl italic text-brand-charcoal tracking-wide">
              StyledByNazima
            </span>
            <span className="text-xs tracking-[0.3em] text-brand-gold uppercase mt-0.5 hidden sm:block">
              Where Tradition Meets Elegance
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://instagram.com/itsafrozmirza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-charcoal/70 hover:text-brand-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://wa.me/919502509455"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-charcoal/70 hover:text-brand-gold transition-colors"
              aria-label="WhatsApp"
            >
              <Phone size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-brand-charcoal p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`nav-link py-2 ${isActive(link.path) ? "nav-link-active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <a
                  href="https://instagram.com/itsafrozmirza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-charcoal/70 hover:text-brand-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://wa.me/919502509455"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-charcoal/70 hover:text-brand-gold transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
